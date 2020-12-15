import { AuthenticationError, NotFoundError } from "app/utils/errors"
import { Ctx } from "blitz"
import db, { FindUniqueCalendarArgs } from "db"
import Sentry from "integrations/sentry"

type GetCalendarInput = {
  where: FindUniqueCalendarArgs["where"]
}

export default async function getCalendar(
	{ where }: GetCalendarInput,
	ctx: Ctx
) {
	if (!where.id) throw new NotFoundError()
	ctx.session.authorize()
	const userId = ctx.session?.userId
	if (!ctx.session || !userId) throw new AuthenticationError()

	try {
  	const calendar = await db.calendar.findUnique({ where })
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
