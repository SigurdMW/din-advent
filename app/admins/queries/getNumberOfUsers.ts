import db from "db"
import { SessionContext } from "blitz"

export default async function getNumberOfUsers(
	// eslint-disable-next-line no-empty-pattern
	{}: any,
	ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize("admin")
  const users = await db.user.count({
	  where: {
		  role: {
			  notIn: "admin"
		  }
	  }
  })
  return users
}
