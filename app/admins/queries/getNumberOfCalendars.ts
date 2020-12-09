import db from "db"
import { Ctx } from "blitz"

export default async function getNumberOfCalendars(
	// eslint-disable-next-line no-empty-pattern
	{}: any,
	ctx: Ctx
) {
	ctx.session.authorize("admin")
	const calendars = await db.calendar.count({ where: {
	  user: {
		  role: {
			  notIn: "admin"
		  }
	  }
	} })
	return calendars
}
