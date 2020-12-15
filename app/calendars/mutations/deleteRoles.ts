import { Ctx } from "blitz"
import db, { Role } from "db"
import { allowedEditCalendar } from "../utils"

export default async function deleteRoles(
	{ roles, calendarId }: { roles: Role[], calendarId: number },
	ctx: Ctx
) {
	await allowedEditCalendar({ calendarId, ctx })
	await db.role.deleteMany({ where: { OR: roles.map((r) => ({ id: r.id })) }})
	return
}
