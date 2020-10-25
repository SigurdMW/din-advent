import { AuthorizationError } from "app/utils/errors"
import { SessionContext } from "blitz"
import db from "db"

export default async function getShareKeys(
  { calendarId }: { calendarId: number },
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const userId = ctx.session?.userId

  // Only the user that created the calendar can get the shareKeys
  const calendar = await db.calendar.findOne({ where: { id: calendarId } })
  if (calendar?.userId !== userId) {
    throw new AuthorizationError()
  }

  const shareKeys = await db.shareKey.findMany({
    where: { calendarId },
    include: { sharedWith: true },
  })
  return shareKeys
}
