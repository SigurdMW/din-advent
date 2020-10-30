import { SessionContext } from "blitz"
import db, { CalendarWindowUpdateArgs } from "db"
import { allowedEditCalendar } from "../utils"


export default async function updateWindow(
	{ windowId, calendarId, data }: { windowId: number, calendarId: number, data: CalendarWindowUpdateArgs["data"] },
	ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  await allowedEditCalendar({ calendarId, ctx })
  const window = await db.calendarWindow.update({ where: { id: windowId }, data })

  return window
}
