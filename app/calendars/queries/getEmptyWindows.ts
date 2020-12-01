import { SessionContext } from "blitz"
import db from "db"
import { allowedEditCalendar, emptyWindowContent } from "../utils"

export default async function getEmptyWindows(
	calendarId: number,
	ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  try {
	  await allowedEditCalendar({ calendarId, ctx })
	  const windows = await db.calendarWindow.findMany({ where: { calendarId, content: emptyWindowContent }, select: { day: true } })
	  return windows.map((w) => w.day)
  } catch (e) {
	  return []
  }
}
