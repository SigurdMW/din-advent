import { AuthenticationError, NotFoundError } from "app/utils/errors"
import { SessionContext } from "blitz"
import db, { Role } from "db"
import { AvailableRoles } from "../utils"

export default async function getCalendarRoles(
	{ calendarId }: { calendarId: number },
	ctx: { session?: SessionContext } = {}
) {
	if (!calendarId) throw new NotFoundError()
  ctx.session!.authorize()
  const userId = ctx.session?.userId
  if (!ctx.session || !userId) throw new AuthenticationError()
  const calendar = await db.calendar.findOne({where: { id: calendarId }})
  if (!calendar) throw new NotFoundError()

  try {
  	const data = await ctx.session.getPrivateData()
  	const roles = data.roles as Role[]
  	const userRoles: AvailableRoles[] = roles && Array.isArray(roles) ? roles.filter((f) => f.calendarId === calendarId).map((r) => r.role) as AvailableRoles[] : []
  	if (calendar.userId === userId) {
  		userRoles.push("admin")
  	}
  	return userRoles
  } catch (e) {
	  return []
  }
}
