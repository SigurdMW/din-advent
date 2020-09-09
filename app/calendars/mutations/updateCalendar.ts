import { SessionContext } from "blitz"
import db, { CalendarUpdateArgs } from "db"

type UpdateCalendarInput = {
  where: CalendarUpdateArgs["where"]
  data: CalendarUpdateArgs["data"]
}

export default async function updateCalendar(
  { where, data }: UpdateCalendarInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const calendar = await db.calendar.update({ where, data })

  return calendar
}
