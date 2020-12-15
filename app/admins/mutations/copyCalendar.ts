import { NotFoundError } from 'app/utils/errors'
import { CopyCalendarInputType, CopyCalendarInput } from "app/admins/validations"
import { Ctx } from "blitz"
import db from "db"

export default async function copyCalendar(
	{ data }: { data: CopyCalendarInputType },
	ctx: Ctx
) {
	ctx.session.authorize("admin")
	const {email, calendarId} = CopyCalendarInput.parse(data)

	let userToCopyTo: undefined | number
	if (email) {
		const user = await db.user.findUnique({ where: { email }})
		if (!user) throw new NotFoundError("No user found for email " + email)
		userToCopyTo = user.id
	}
	const calendar = await db.calendar.findUnique({ where: { id: calendarId }})
	if (!calendar) throw new NotFoundError("No calendar found for id " + calendarId)
	const calendarWindows = await db.calendarWindow.findMany({ where: { calendarId }})
	if (calendarWindows.length !== 24) throw new Error("Hmm, kalender har ikke 24 luker...")
	const newCalendar = await db.calendar.create({ data: {
		options: calendar.options,
		name: calendar.name,
		user: {
			connect: {
				id: userToCopyTo || calendar.userId
			}
		},
		calendarWindows: {
			create: calendarWindows.map((v) => ({
				day: v.day,
				content: v.content
			}))
		}
	}})
	return newCalendar.id
}
