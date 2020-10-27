import { AuthorizationError } from "app/utils/errors"
import { SessionContext } from "blitz"
import db from "db"

export default async function deleteUserInvite(
  { id }: { id: number },
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const userId = ctx.session?.userId
  const shareKey = await db.userInvite.findOne({ where: { id } })
  if (shareKey?.createdBy !== userId) {
    throw new AuthorizationError("Du har ikke rettigheter til å slette denne invitasjonen.")
  }
  await db.userInvite.delete({ where: { id } })
  return
}
