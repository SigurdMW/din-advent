import { NotFoundError } from "app/utils/errors"
import { SessionContext } from "blitz"
import db from "db"

export default async function getShareKey(
  { where }: { where: { calendarId: number } },
  ctx: { session?: SessionContext } = {}
) {
  try {
    ctx.session!.authorize()
    const userId = ctx.session?.userId

    // can only get shareKeys the logged in user created
    const shareKeys = await db.shareKey.findMany({ where: { ...where, userId } })

    if (!shareKeys || shareKeys.length === 0) throw new NotFoundError()

    return shareKeys[0].key
  } catch (e) {
    return
  }
}
