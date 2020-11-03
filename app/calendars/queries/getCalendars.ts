import { SessionContext } from "blitz"
import db, { Role, FindManyCalendarArgs } from "db"

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
	ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const userId = ctx.session?.userId
  const data = await ctx.session?.getPrivateData()
  const roles = data && data.roles ? data.roles : ([] as Role[])
  const calendarIds = roles.map((r) => r.calendarId)
  const calendars = await db.calendar.findMany({
	  where: { OR: [{ id: { in: calendarIds } }, { userId: userId }] },
	  include: {
		  user: true,
		  lastUpdateBy: true
	  },
  	orderBy,
  })
  return calendars
}
