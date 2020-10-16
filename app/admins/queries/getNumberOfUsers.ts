import db from "db"
import { SessionContext } from "blitz"

export default async function getNumberOfUsers({}: any, ctx: { session?: SessionContext } = {}) {
  ctx.session!.authorize("admin")
  const users = await db.user.findMany({ select: { id: true } })
  return users.length
}
