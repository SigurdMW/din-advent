import { Ctx } from "blitz"
import db, { FindManyCalendarWindowArgs } from "db"
import { GetWindowInput } from "../validations"
import createWindow from "../mutations/createWindow"
import { allowedToAccessWindow } from "../utils"

export default async function getWindow(
	{ where }: FindManyCalendarWindowArgs,
	ctx: Ctx
) {
	ctx.session.authorize()
	const { calendarId, day } = GetWindowInput.parse(where)
	await allowedToAccessWindow({ calendarId, day, ctx })
	const windows = await db.calendarWindow.findMany({ where: { calendarId, day } })
	if (!windows || windows.length === 0) {
  	const window = await createWindow({ data: { calendarId, day } }, ctx)
  	return window
	}
	if (windows.length !== 1) throw new Error("More than one calendar window found for this id")
	return windows[0]
}
