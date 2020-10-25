import { sendEmail } from "app/email"
import db from "db"
import { Plan } from "app/interfaces/Payment"
import { ExceededPlanError, GeneralError, PaymentRequiredError } from "app/utils/errors"
import { SessionContext } from "blitz"

interface ShareCalendarCommon {
  calendarId: number
  userId: number
}

interface ShareCalendarCreateSharekey extends ShareCalendarCommon {
  sharedWithUserId?: number
  email?: string
}

interface ShareCalendarUserId extends ShareCalendarCommon {
  sharedWithUserId: number
}

interface ShareCalendarEmail extends ShareCalendarCommon {
  email: string
}

export const authAndValidatePlanLimit = async (ctx: { session?: SessionContext }) => {
  ctx.session!.authorize()
  const userId = ctx.session?.userId
  if (!userId) throw new Error("Missing userId")
  const userPublicData = ctx.session?.publicData
  if (!userPublicData || !userPublicData.plan) throw new PaymentRequiredError()

  const shareKeys = await db.shareKey.findMany({ where: { createdBy: userId } })
  if (userPublicData.plan === Plan.starter && shareKeys.length >= 1) throw new ExceededPlanError()
  if (userPublicData.plan === Plan.basic && shareKeys.length >= 5) throw new ExceededPlanError()
  return userId
}

const createShareKey = async ({
  calendarId,
  userId,
  email,
  sharedWithUserId,
}: ShareCalendarCreateSharekey) => {
  if (!sharedWithUserId && !email) throw new GeneralError()
  const shareWithUserId = !!sharedWithUserId
  const shareKey = await db.shareKey.create({
    data: {
      user: {
        connect: { id: userId },
      },
      calendar: {
        connect: { id: calendarId },
      },
      email: shareWithUserId ? undefined : email,
      key: null,
      sharedWith: shareWithUserId ? { connect: { id: sharedWithUserId } } : undefined,
    },
  })

  return shareKey
}

export const shareCalendarWithUserId = async ({
  calendarId,
  userId,
  sharedWithUserId,
}: ShareCalendarUserId) => {
  const shareKey = await createShareKey({ calendarId, userId, sharedWithUserId })
  const user = await db.user.findOne({ where: { id: userId } })
  const sharedWithUser = await db.user.findOne({
    where: { id: sharedWithUserId },
    select: { email: true },
  })
  if (!sharedWithUser) return
  const email = sharedWithUser.email
  const displayName = user?.name || user?.email
  const messageAndTitle = `${displayName} har delt en kalender med deg`
  await sendEmail({
    to: email,
    subject: `${messageAndTitle} - Din Advent`,
    html: `
				  <h1>${messageAndTitle}!</h1>
				  <p>${displayName} har delt en kalender med deg. Logg deg inn på dinadvent.no for å se kalenderen. Du finner den under "Dine kalendere":</p>
				  <p><a href="${process.env.BASE_URL}login">Logg inn på Din Advent</a></p>`,
  })
  return shareKey
}

export const shareCalendarWithEmail = async ({ calendarId, userId, email }: ShareCalendarEmail) => {
  const shareKey = await createShareKey({ calendarId, userId, email })
  const user = await db.user.findOne({ where: { id: shareKey.createdBy } })
  const displayName = user?.name || user?.email
  const messageAndTitle = `${displayName} har delt en kalender med deg`
  await sendEmail({
    to: email,
    subject: `${messageAndTitle} - Din Advent`,
    html: `
				  <h1>${messageAndTitle}!</h1>
				  <p>${displayName} ønsker å dele en kalender med deg. For å få tilgang til kalenderen, må du opprette en bruker og logge inn på Din Advent. Det gjør du her:</p>
				  <p><a href="${process.env.BASE_URL}signup">Opprett bruker på Din Advent</a></p>
				  <p><strong>NB!</strong> Det er viktig at du benytter denne e-postadressen når du oppretter brukeren for å få tilgang til den delte kalenderen.</p>`,
  })
  return shareKey
}
