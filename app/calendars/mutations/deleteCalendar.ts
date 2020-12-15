import { AuthorizationError, NotFoundError } from "app/utils/errors"
import { Ctx } from "blitz"
import db, { CalendarDeleteArgs } from "db"

type DeleteCalendarInput = {
  where: CalendarDeleteArgs["where"]
}

export default async function deleteCalendar(
	{ where }: DeleteCalendarInput,
	ctx: Ctx
) {
	ctx.session.authorize()

	const userId = ctx.session?.userId

	const calendar = await db.calendar.findUnique({ where: { id: where.id }})
	if (!calendar) throw new NotFoundError()
	if (!userId || calendar.userId !== userId) throw new AuthorizationError("Du har ikke tillatelse til å slette denne kalenderen")

	await db.role.deleteMany({ where: { calendarId: where.id }})
	await db.calendarWindow.deleteMany({ where: { calendarId: where.id } })
	await db.shareKey.deleteMany({ where: { calendarId: where.id } })
	await db.calendar.delete({ where })
	return
}