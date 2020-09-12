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

  await db.calendar.delete({ where, include: { calendarWindows: true, user: false } })
  return
}
