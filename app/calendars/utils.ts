import { sendEmail } from "app/email"
import db, { UserInviteCreateInput, User } from "db"
import { Plan } from "app/interfaces/Payment"
import { ExceededPlanError, NotFoundError, PaymentRequiredError } from "app/utils/errors"
import { SessionContext } from "blitz"

export type AvailableRoles =
  | "reader"
  | "editor"
  | "admin"
  | "editor/1"
  | "editor/2"
  | "editor/3"
  | "editor/4"
  | "editor/5"
  | "editor/6"
  | "editor/7"
  | "editor/8"
  | "editor/9"
  | "editor/10"
  | "editor/11"
  | "editor/12"
  | "editor/13"
  | "editor/14"
  | "editor/15"
  | "editor/16"
  | "editor/17"
  | "editor/18"
  | "editor/19"
  | "editor/20"
  | "editor/21"
  | "editor/22"
  | "editor/23"
  | "editor/24"

interface GrantCalendarAccess {
  calendarId: number
  user: User
  createdBy: number
  role: AvailableRoles
}

export const authAndValidatePlanLimit = async (ctx: { session?: SessionContext }) => {
  ctx.session!.authorize()
  const userId = ctx.session?.userId
  if (!userId) throw new Error("Missing userId")
  const userPublicData = ctx.session?.publicData
  if (!userPublicData || !userPublicData.plan) throw new PaymentRequiredError()

  const shareKeys = await db.shareKey.findMany({ where: { createdBy: userId } })
  if (userPublicData.plan === Plan.starter && shareKeys.length >= 1) throw new ExceededPlanError()
  if (userPublicData.plan === Plan.basic && shareKeys.length >= 10) throw new ExceededPlanError()
  return userId
}

export const grantCalendarAccess = async ({
	calendarId,
	user,
	role,
	createdBy,
}: GrantCalendarAccess) => {
	await db.role.create({
		data: {
			calendar: {
				connect: { id: calendarId },
			},
			role,
			user: {
				connect: { id: user.id },
			},
			createdByUser: {
				connect: { id: createdBy },
			},
		},
	})
	const createdByUser = await db.user.findOne({ where: { id: createdBy } })
	if (!createdByUser) throw new NotFoundError()

	const displayName = createdByUser.name || createdByUser.email
	const messageAndTitle = `${displayName} har delt en kalender med deg`
	await sendEmail({
		to: user.email,
		subject: `${messageAndTitle} - Din Advent`,
		html: `
			<h1>${messageAndTitle}!</h1>
			<p>${displayName} har delt en kalender med deg. Logg deg inn på dinadvent.no for å se kalenderen. Du finner den under "Dine kalendere":</p>
			<p><a href="${process.env.BASE_URL}login">Logg inn på Din Advent</a></p>`,
	})
}

interface CreateUserInvite extends Omit<UserInviteCreateInput, "calendar" | "user" | "role"> {
  calendarId: number
  userId: number
  role: AvailableRoles
}

export const createUserInvite = async ({ calendarId, email, userId, role }: CreateUserInvite) => {
	await db.userInvite.create({
		data: {
			email,
			role,
			calendar: {
				connect: { id: calendarId },
			},
			user: {
				connect: { id: userId },
			},
		},
	})
	const user = await db.user.findOne({ where: { id: userId } })
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
}
