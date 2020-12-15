import { AuthenticationError, NotFoundError } from "app/utils/errors"
import { Ctx } from "blitz"
import db from "db"

export default async function getCalendarRoles(
	{ calendarId }: { calendarId: number },
	ctx: Ctx
) {
	if (!calendarId) throw new NotFoundError()
	ctx.session.authorize()
	const userId = ctx.session?.userId
	if (!ctx.session || !userId) throw new AuthenticationError()
	const calendar = await db.calendar.findUnique({where: { id: calendarId }})
	if (!calendar) throw new NotFoundError()

	try {
  	const roles = await db.role.findMany({
		  where: {
			  calendarId, userId
		  },
		  select: {
			  role: true
		  }
  	})
  	const userRoles = roles.map((r) => r.role)
  	if (calendar.userId === userId) {
  		userRoles.push("admin")
  	}
  	return userRoles
	} catch (e) {
	  return []
	}
}
