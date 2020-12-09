import { Ctx } from "blitz"
import db from "db"
import { allowedEditCalendar, authAndValidatePlanLimit } from "../utils"

type CreateShareKeyInput = {
  calendarId: number
}

export default async function shareCalendarByKey(
	{ calendarId }: CreateShareKeyInput,
	ctx: Ctx
) {
	const userId = await authAndValidatePlanLimit(ctx)
	await allowedEditCalendar({ calendarId, ctx })

	const shareKey = await db.shareKey.create({
		data: {
			user: {
				connect: { id: userId },
			},
			calendar: {
				connect: { id: calendarId },
			},
		},
	})

	return shareKey.key
}
