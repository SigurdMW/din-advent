import db from "db"
import { SessionContext } from "blitz"

export default async function getNumberOfCalendars(
	// eslint-disable-next-line no-empty-pattern
	{}: any,
	ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize("admin")
  const calendars = await db.calendar.findMany({ select: { id: true } })
  return calendars.length
}
