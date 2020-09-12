import { SessionContext } from "blitz"
import db, { CalendarDeleteArgs } from "db"

type DeleteCalendarInput = {
  where: CalendarDeleteArgs["where"]
}

export default async function deleteCalendar(
  { where }: DeleteCalendarInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const calendar = await db.calendar.delete({ where })

  return calendar
}
