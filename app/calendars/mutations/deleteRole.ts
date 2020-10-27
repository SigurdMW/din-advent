import { AuthorizationError, NotFoundError } from "app/utils/errors"
import { SessionContext } from "blitz"
import db from "db"

export default async function deleteRole(
	{ id }: { id: number },
	ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const userId = ctx.session?.userId
  const role = await db.role.findOne({ where: { id } })
  if (!role) throw new NotFoundError()
  if (role.createdBy !== userId) {
  	throw new AuthorizationError("Du har ikke rettigheter til å slette denne rollen.")
  }
  await db.role.delete({ where: { id } })
  return
}
