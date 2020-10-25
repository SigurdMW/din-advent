import { AuthenticationError, NotFoundError, ValidationError } from "app/utils/errors"
import { ShareByEmailFunctionArgsType, ShareByEmailFunctionArgs } from "../validations"
import { SessionContext } from "blitz"
import db from "db"
import { authAndValidatePlanLimit, shareCalendarWithUserId, shareCalendarWithEmail } from "../utils"

export default async function shareCalendar(
  { email, calendarId }: ShareByEmailFunctionArgsType,
  ctx: { session?: SessionContext } = {}
) {
  ShareByEmailFunctionArgs.parse({ email, calendarId })
  const userId = await authAndValidatePlanLimit(ctx)

  const calendar = await db.calendar.findOne({ where: { id: calendarId } })
  if (!calendar) throw new NotFoundError()

  // Only the user that created the calendar
  if (calendar.userId !== userId) throw new AuthenticationError()

  let userIdShare: undefined | number = undefined
  try {
    const userToShare = await db.user.findOne({ where: { email } })
    if (userToShare) {
      userIdShare = userToShare.id
    }
  } catch (e) {
    // do nothing, share with a email if it fails
  }

  if (userIdShare === userId) throw new ValidationError("Mente du virkelig å dele med deg selv...?")

  const emailOrUndefined = userIdShare ? undefined : email
  const userIdOrUndefined = userIdShare ? userIdShare : undefined

  // Secure that the calendar isn't already shared
  const share = await db.shareKey.findMany({
    where: {
      calendarId,
      email: emailOrUndefined,
      sharedWith: userIdOrUndefined ? { id: userIdOrUndefined } : undefined,
    },
  })
  if (share.length > 0) {
    throw new ValidationError("Kalenderen er allerede delt med denne brukeren.")
  }

  if (userIdShare) {
    const shareUserId = await shareCalendarWithUserId({
      calendarId,
      userId,
      sharedWithUserId: userIdShare,
    })
    return shareUserId
  } else {
    const shareEmail = await shareCalendarWithEmail({ calendarId, userId, email: email.trim() })
    return shareEmail
  }
}
