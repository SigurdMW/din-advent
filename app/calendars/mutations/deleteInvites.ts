import { SessionContext } from "blitz"
import db, { UserInvite } from "db"
import { allowedEditCalendar } from "../utils"

export default async function deleteRoles(
	{ invites, calendarId }: { invites: UserInvite[], calendarId: number },
	ctx: { session?: SessionContext } = {}
) {
	await allowedEditCalendar({ calendarId, ctx })
	await db.userInvite.deleteMany({ where: { OR: invites.map((i) => ({ id: i.id })) }})
	return
}
