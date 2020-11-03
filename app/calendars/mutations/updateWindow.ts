import { SessionContext } from "blitz"
import db, { CalendarWindowUpdateArgs } from "db"
import { allowedEditCalendarWindow } from "../utils"


export default async function updateWindow(
	{ windowId, day, calendarId, data }: { windowId: number, day: number, calendarId: number, data: CalendarWindowUpdateArgs["data"] },
	ctx: { session?: SessionContext } = {}
) {
	ctx.session!.authorize()
	const userId = await allowedEditCalendarWindow({ calendarId, day, ctx })
	const window = await db.calendarWindow.update({
		where: {
			id: windowId
		},
		data: {
			...data,
			lastUpdateBy: {
				connect: {
					id: userId
				}
			}
		}
	})
	await db.calendar.update({
		where: {
			id: calendarId
		},
		data: {
			lastUpdateBy: {
				connect: {
					id: userId
				}
			}
		}
	})

	return window
}
