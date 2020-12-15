import { AuthenticationError } from 'app/utils/errors';
import { Ctx } from "blitz"
import db, { FindManyCalendarArgs } from "db"

type GetCalendarsInput = {
  where?: FindManyCalendarArgs["where"]
  orderBy?: FindManyCalendarArgs["orderBy"]
  cursor?: FindManyCalendarArgs["cursor"]
  take?: FindManyCalendarArgs["take"]
  skip?: FindManyCalendarArgs["skip"]
  // Only available if a model relationship exists
  // include?: FindManyCalendarArgs['include']
}

export default async function getCalendars(
	{ where, orderBy, cursor, take, skip }: GetCalendarsInput,
	ctx: Ctx
) {
	ctx.session.authorize()
	const userId = ctx.session?.userId
	if (!userId) throw new AuthenticationError()
	const roles = await db.role.findMany({ where: { calendarId: where?.id, userId }})
	const calendars = await db.calendar.findMany({
	  where: { OR: [{ id: { in: roles.map((r) => r.calendarId) } }, { userId: userId }] },
	  include: {
		  user: true,
		  lastUpdateBy: true
	  },
  	orderBy,
	})
	return calendars
}
