import db from "db"
import { SessionContext } from "blitz"

export default async function getUserInfo(
	// eslint-disable-next-line no-empty-pattern
	email: string,
	ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize("admin")
  if (!email) return
  const user = await db.user.findOne({ where: { email }, include: { Calendar: true, Role: true, ShareKey: true, Payment: true, UserInvite: true } })
  if (!user) return
  return { ...user, hashedPassword: undefined }
}
