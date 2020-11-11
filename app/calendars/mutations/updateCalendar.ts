import { ValidationError } from "app/utils/errors"
import { SessionContext } from "blitz"
import db, { CalendarUpdateArgs } from "db"
import { allowedEditCalendar } from "../utils"
import { CalendarUpdate } from "../validations"

type UpdateCalendarInput = {
	where: CalendarUpdateArgs["where"]
	data: CalendarUpdateArgs["data"]
}

export default async function updateCalendar(
	{ where, data }: UpdateCalendarInput,
	ctx: { session?: SessionContext } = {}
) {
	CalendarUpdate.parse({ name: data.name, options: data.options ? JSON.parse(data.options) : undefined })
	ctx.session!.authorize()
	if (!where.id) throw new ValidationError()
	const userId = await allowedEditCalendar({ calendarId: where.id, ctx })

	const calendar = await db.calendar.update({
		where,
		data: {
			...data,
			lastUpdateBy: {
				connect: {
					id: userId
				}
			}
		}
	})

	return calendar
}
