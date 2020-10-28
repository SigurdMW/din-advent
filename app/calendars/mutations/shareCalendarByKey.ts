import { SessionContext } from "blitz"
import db from "db"
import { authAndValidatePlanLimit } from "../utils"

type CreateShareKeyInput = {
  calendarId: number
}

export default async function shareCalendarByKey(
	{ calendarId }: CreateShareKeyInput,
	ctx: { session?: SessionContext } = {}
) {
	const userId = await authAndValidatePlanLimit(ctx)

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
