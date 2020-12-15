import { AuthorizationError, NotFoundError } from "app/utils/errors"
import { Ctx } from "blitz"
import db from "db"

export default async function deleteRole(
	{ id }: { id: number },
	ctx: Ctx
) {
	ctx.session.authorize()
	const userId = ctx.session?.userId
	const role = await db.role.findUnique({ where: { id } })
	if (!role) throw new NotFoundError()
	if (role.createdBy !== userId) {
  	throw new AuthorizationError("Du har ikke rettigheter til å slette denne rollen.")
	}
	await db.role.delete({ where: { id } })
	return
}
