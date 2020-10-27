import { AuthorizationError, NotFoundError } from "app/utils/errors"
import { SessionContext } from "blitz"
import db from "db"

export default async function getCalendarShares(
  { calendarId }: { calendarId: number },
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const userId = ctx.session?.userId

  // Only the user that created the calendar can get the shareKeys
  const calendar = await db.calendar.findOne({
    where: { id: calendarId },
    include: { shareKeys: true, Role: { include: { user: true } }, UserInvite: true },
  })
  if (!calendar) throw new NotFoundError()
  if (calendar.userId !== userId) {
    throw new AuthorizationError()
  }

  return {
    shareKeys: calendar.shareKeys,
    roles: calendar.Role,
    userInvites: calendar.UserInvite,
  }
}
