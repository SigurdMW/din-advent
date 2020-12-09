import db from "db"
import { Ctx } from "blitz"

export default async function getNumberOfUsers(
	// eslint-disable-next-line no-empty-pattern
	{}: any,
	ctx: Ctx
) {
	ctx.session.authorize("admin")
	const users = await db.user.count({
	  where: {
		  role: {
			  notIn: "admin"
		  }
	  }
	})
	return users
}
