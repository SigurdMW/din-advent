import { AuthorizationError } from "app/utils/errors"
import { Ctx } from "blitz"
import db from "db"

export default async function deleteCalendar(
	{ id }: { id: number },
	ctx: Ctx
) {
	ctx.session.authorize()
	const userId = ctx.session?.userId
	const shareKey = await db.shareKey.findUnique({ where: { id } })
	if (shareKey?.createdBy !== userId) {
  	throw new AuthorizationError("Du har ikke rettigheter til å slette denne brukeren.")
	}
	await db.shareKey.delete({ where: { id } })
	return
}
