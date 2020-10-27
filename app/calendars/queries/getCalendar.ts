import { AuthenticationError, NotFoundError } from "app/utils/errors"
import { SessionContext } from "blitz"
import db, { FindOneCalendarArgs, Role } from "db"

type GetCalendarInput = {
  where: FindOneCalendarArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneCalendarArgs['include']
}

export default async function getCalendar(
	{ where }: GetCalendarInput,
	ctx: { session?: SessionContext } = {}
) {
	if (!where.id) throw new NotFoundError()
  ctx.session!.authorize()
  const userId = ctx.session?.userId
  if (!ctx.session || !userId) throw new AuthenticationError()

  const data = await ctx.session.getPrivateData()
  const roles = (data && data.roles ? data.roles : []) as Role[]
  const calendarIds = roles.map((r) => r.calendarId)
  const hasRole = calendarIds.includes(where.id)
  const calendar = await db.calendar.findOne({ where })

  if (!calendar) throw new NotFoundError()
  const shouldHaveAccess = hasRole || userId === calendar.userId
  if (!shouldHaveAccess) throw new NotFoundError()

  return calendar
}
