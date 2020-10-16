import { Plan } from "app/interfaces/Payment"
import { ExceededPlanError, PaymentRequiredError } from "app/utils/errors"
import { SessionContext } from "blitz"
import db from "db"

type CreateShareKeyInput = {
  calendarId: number
}

export default async function shareCalendar(
  { calendarId }: CreateShareKeyInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const userId = ctx.session?.userId
  if (!userId || !calendarId) throw new Error("Missing userId or calendarId")

  const userPublicData = ctx.session?.publicData
  if (!userPublicData || !userPublicData.plan) throw new PaymentRequiredError()

  const shareKeys = await db.shareKey.findMany({ where: { createdBy: userId } })
  if (userPublicData.plan === Plan.starter && shareKeys.length >= 1) throw new ExceededPlanError()
  if (userPublicData.plan === Plan.basic && shareKeys.length >= 5) throw new ExceededPlanError()

  const shareKey = await db.shareKey.create({
    data: {
      user: {
        connect: { id: userId },
      },
      calendar: {
        connect: { id: calendarId },
      },
    },
  })

  return shareKey.key
}
