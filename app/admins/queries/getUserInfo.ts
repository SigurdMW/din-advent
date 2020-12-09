import db from "db"
import { Ctx } from "blitz"

export default async function getUserInfo(
	// eslint-disable-next-line no-empty-pattern
	email: string,
	ctx: Ctx
) {
	ctx.session.authorize("admin")
	if (!email) return
	const user = await db.user.findUnique({ 
	  where: { email: email.toLowerCase() },
  	include: { Calendar: true, Role: true, ShareKey: true, Payment: true, UserInvite: true } })
	if (!user) return
	return { ...user, hashedPassword: undefined }
}
