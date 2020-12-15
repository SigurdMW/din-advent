import { ValidationError } from "app/utils/errors"
import { Ctx } from "blitz"
import db, { CalendarUpdateArgs, NullableStringFieldUpdateOperationsInput } from "db"
import { allowedEditCalendar } from "../utils"
import { CalendarUpdate } from "../validations"

type UpdateCalendarInput = {
	where: CalendarUpdateArgs["where"]
	data: CalendarUpdateArgs["data"]
}

const getOptions = (opt: string | null | undefined | NullableStringFieldUpdateOperationsInput ) => {
	if (!opt || typeof opt !== "string") return undefined
	try {
		const parsed = JSON.parse(opt)
		return parsed
	} catch (e) {
		// eslint-disable-next-line no-console
		console.log("Could not parse options", e)
		return undefined
	}
}

export default async function updateCalendar(
	{ where, data }: UpdateCalendarInput,
	ctx: Ctx
) {
	ctx.session.authorize()
	const options = getOptions(data.options)
	CalendarUpdate.parse({ name: data.name, options })
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
