import { NotFoundError } from "app/utils/errors"
import { SessionContext } from "blitz"
import db, { FindOneCalendarArgs } from "db"

type GetCalendarInput = {
  where: FindOneCalendarArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneCalendarArgs['include']
}

export default async function getCalendar(
  { where }: GetCalendarInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const userId = ctx.session?.userId
  const calendar = await db.calendar.findOne({ where })

  if (!calendar || calendar.userId !== userId) throw new NotFoundError()

  //   const windows = await db.calendarWindow.findMany({ where: { calendarId: calendar.id } })

  return calendar
}
