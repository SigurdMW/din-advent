import { NotFoundError } from "app/utils/errors"
import db from "db"
import { SessionContext } from "blitz"

export default async function getCalendarOwner(
	// eslint-disable-next-line no-empty-pattern
	calendarId: number,
	ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize("admin")
  const calendar = await db.calendar.findOne({ where: { id: calendarId }})
  if (!calendar) throw new NotFoundError("No calendar found with id " + calendarId)
  const user = await db.user.findOne({ where: { id: calendar.userId }})
  return user
}
