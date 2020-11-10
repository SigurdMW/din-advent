import { AuthorizationError } from 'app/utils/errors';
import { AdminInputType } from "app/admins/validations"
import { SessionContext } from "blitz"
import db from "db"

export default async function createAdmin(
	{ data }: { data: AdminInputType },
	ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const userId = ctx.session?.userId
  if (!userId) throw new AuthorizationError()

  const user = await db.user.findOne({ where: {id: userId }})
  if (!user) throw new AuthorizationError()
  if (user.email === "sigurdmwahl@gmail.com") {
  	await db.user.update({ where: { email: data.email }, data: { role: "admin" } })
  	return
  }

  ctx.session?.authorize("admin")
  await db.user.update({ where: { email: data.email }, data: { role: "admin" } })
  return
}
