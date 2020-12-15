import { NotFoundError } from "app/utils/errors"
import { Ctx } from "blitz"
import db from "db"
import { allowedEditCalendar } from "../utils"

export default async function getCalendarShares(
	{ calendarId }: { calendarId: number },
	ctx: Ctx
) {
	ctx.session.authorize()

	await allowedEditCalendar({ calendarId, ctx })
	const calendar = await db.calendar.findUnique({
  	where: { id: calendarId },
  	include: { shareKeys: true, Role: { include: { user: true } }, UserInvite: true },
	})
	if (!calendar) throw new NotFoundError()

	return {
  	shareKeys: calendar.shareKeys,
  	roles: calendar.Role,
  	userInvites: calendar.UserInvite,
	}
}
