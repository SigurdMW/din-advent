import { CalendarInput, CalendarInputType } from "../validations"
import { Ctx } from "blitz"
import db from "db"
import { ExceededPlanError } from "app/utils/errors"
import { emptyWindowContent } from "../utils"

export default async function createCalendar(
	{ data }: { data: CalendarInputType },
	ctx: Ctx
) {
	CalendarInput.parse(data)
	ctx.session.authorize()
	const userId = ctx.session!.userId
	const numCalendars = await db.calendar.count({ where: { userId } })
	if (numCalendars > 50) throw new ExceededPlanError("Du har laget maks antall kalendere.")
	
	const calendar = await db.calendar.create({
		data: {
			name: data.name,
			user: {
				connect: {
					id: userId,
				},
			},
			calendarWindows: {
				create: (new Array(24).fill(0)).map((v, index) => ({
					day: index + 1,
					content: emptyWindowContent,
				}))
			}
		},
	})

	return calendar.id
}
