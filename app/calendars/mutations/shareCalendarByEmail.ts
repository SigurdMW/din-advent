import { AuthenticationError, NotFoundError, ValidationError } from "app/utils/errors"
import { ShareByEmailFunctionArgsType, ShareByEmailFunctionArgs } from "../validations"
import { SessionContext } from "blitz"
import db from "db"
import { authAndValidatePlanLimit, createUserInvite, grantCalendarAccess } from "../utils"

export default async function shareCalendarByEmail(
  { email, calendarId }: ShareByEmailFunctionArgsType,
  ctx: { session?: SessionContext } = {}
) {
  ShareByEmailFunctionArgs.parse({ email, calendarId })
  const userId = await authAndValidatePlanLimit(ctx)

  const calendar = await db.calendar.findOne({ where: { id: calendarId } })
  if (!calendar) throw new NotFoundError()

  // Only the user that created the calendar
  if (calendar.userId !== userId) throw new AuthenticationError()

  const user = await db.user.findOne({ where: { email } })
  if (!user) {
    await createUserInvite({
      userId,
      email,
      calendarId,
      role: "reader",
    })
    return
  }
  if (user.id === userId) throw new ValidationError("Mente du virkelig å dele med deg selv?")
  await grantCalendarAccess({
    user,
    role: "reader",
    calendarId,
    createdBy: userId,
  })
}
