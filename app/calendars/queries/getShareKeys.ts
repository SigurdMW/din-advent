import { AuthorizationError } from "app/utils/errors"
import { SessionContext } from "blitz"
import db from "db"

// WORK in progress
export default async function getShareKey(
  { where }: { where: { calendarId: number } },
  ctx: { session?: SessionContext } = {}
) {
  try {
    ctx.session!.authorize()
    const userId = ctx.session?.userId

    // Only the user that created the calendar can get the shareKeys
    const calendar = await db.calendar.findOne({ where: { id: where.calendarId } })
    if (calendar?.userId !== userId) {
      throw new AuthorizationError()
    }

    const shareKeys = await db.shareKey.findMany({ where })
    return shareKeys
  } catch (e) {
    return
  }
}
