import { AuthorizationError } from 'app/utils/errors';
import { AdminInputType } from "app/admins/validations"
import { Ctx } from "blitz"
import db from "db"

export default async function createProject({data}: { data: AdminInputType }, ctx: Ctx) {
	ctx.session.authorize()
	const userId = ctx.session.userId
	if (!userId) throw new AuthorizationError()

	const user = await db.user.findUnique({ where: {id: userId }})
	if (!user) throw new AuthorizationError()
  ctx.session?.authorize("admin")
  await db.user.update({ where: { email: data.email.toLowerCase() }, data: { role: "admin" } })
  return
}
