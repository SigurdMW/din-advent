import { SessionContext } from "blitz"
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
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const calendars = await db.calendar.findMany({
    where,
    orderBy,
    cursor,
    take,
    skip,
  })

  return calendars
}
