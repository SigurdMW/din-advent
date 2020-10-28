import { SessionContext } from "blitz"
import db, { CalendarWindowUpdateArgs } from "db"

type UpdateCalendarWindowInput = {
  where: CalendarWindowUpdateArgs["where"]
  data: CalendarWindowUpdateArgs["data"]
}

export default async function updateWindow(
	{ where, data }: UpdateCalendarWindowInput,
	ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const window = await db.calendarWindow.update({ where, data })

  return window
}
