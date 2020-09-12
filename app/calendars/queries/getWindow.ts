import { NotFoundError, SessionContext } from "blitz"
import db, { FindManyCalendarWindowArgs } from "db"

export default async function getWindow(
  { where }: FindManyCalendarWindowArgs,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const windows = await db.calendarWindow.findMany({ where })
  if (!windows || windows.length === 0) throw new NotFoundError()
  if (windows.length !== 1) throw new Error("More than one calendar window found for this id")
  return windows[0]
}
