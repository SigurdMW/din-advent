import { ValidationError } from 'app/utils/errors';
import { SessionContext } from "blitz"
import db, { CalendarUpdateArgs } from "db"
import { allowedEditCalendar } from "../utils"

type UpdateCalendarInput = {
  where: CalendarUpdateArgs["where"]
  data: CalendarUpdateArgs["data"]
}

export default async function updateCalendar(
	{ where, data }: UpdateCalendarInput,
	ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  if (!where.id) throw new ValidationError()
  await allowedEditCalendar({ calendarId: where.id, ctx })

  const calendar = await db.calendar.update({ where, data })

  return calendar
}
