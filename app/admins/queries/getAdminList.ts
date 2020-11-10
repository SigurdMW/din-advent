import db from "db"
import { SessionContext } from "blitz"

export default async function getAdminList(
	// eslint-disable-next-line no-empty-pattern
	nothing: any,
	ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize("admin")
  const admins = await db.user.findMany({
	  where: {
		  role: {
			  in: "admin"
		  }
	  },
	 select: {
		 email: true,
		 name: true,
		 id: true
	 }
  })
  return admins
}
