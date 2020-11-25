import { AuthenticationError, NotFoundError } from "app/utils/errors"
import { SessionContext } from "blitz"
import db, { FindOneCalendarArgs } from "db"
import Sentry from "integrations/sentry"

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

  try {
  	const calendar = await db.calendar.findOne({ where })
  	if (!calendar) throw new NotFoundError()
  	if (userId === calendar.userId) return calendar
	
  	const roles = await db.role.count({
  		where: {
  			userId,
  			calendarId: where.id
  		}
  	})

  	if (roles === 0) throw new NotFoundError() 
  	return calendar
  } catch (e) {
  	Sentry.captureException(e)
  	throw e
  }
}
