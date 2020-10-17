import { NotFoundError } from "app/utils/errors"
import { SessionContext } from "blitz"
import db from "db"

export default async function getShareKey(
  { where }: { where: { calendarId: number } },
  ctx: { session?: SessionContext } = {}
) {
  try {
    ctx.session!.authorize()
    // TODO: make sure this cannot be called by people not owning the calendar
    const shareKeys = await db.shareKey.findMany({ where })

    if (!shareKeys || shareKeys.length === 0) throw new NotFoundError()

    return shareKeys[0].key
  } catch (e) {
    return
  }
}
