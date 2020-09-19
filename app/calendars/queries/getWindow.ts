import { NotFoundError, SessionContext } from "blitz"
import db, { FindManyCalendarWindowArgs } from "db"
import { GetWindowInput } from "../validations"

export default async function getWindow(
  { where }: FindManyCalendarWindowArgs,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const { calendarId, day } = GetWindowInput.parse(where)
  const windows = await db.calendarWindow.findMany({ where: { calendarId, day } })
  if (!windows || windows.length === 0) throw new NotFoundError()
  if (windows.length !== 1) throw new Error("More than one calendar window found for this id")
  return windows[0]
}
