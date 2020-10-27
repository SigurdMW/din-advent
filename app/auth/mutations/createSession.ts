import { SessionContext } from "blitz"
import db, { User } from "db"

export default async function createSession(user: User, ctx: { session?: SessionContext } = {}) {
  const roles = await db.role.findMany({ where: { userId: user.id } })
  await ctx.session!.create(
    {
      userId: user.id,
      roles: [user.role],
    },
    {
      updated: Date.now(),
      roles,
    }
  )
}
