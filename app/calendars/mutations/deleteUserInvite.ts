import { AuthorizationError } from "app/utils/errors"
import { Ctx } from "blitz"
import db from "db"

export default async function deleteUserInvite(
	{ id }: { id: number },
	ctx: Ctx
) {
	ctx.session.authorize()
	const userId = ctx.session?.userId
	const shareKey = await db.userInvite.findUnique({ where: { id } })
	if (shareKey?.createdBy !== userId) {
  	throw new AuthorizationError("Du har ikke rettigheter til å slette denne invitasjonen.")
	}
	await db.userInvite.delete({ where: { id } })
	return
}
