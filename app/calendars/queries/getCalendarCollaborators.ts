import { EmailAndInvite, UserAndRoles } from "app/interfaces/Collaborate"
import { NotFoundError, AuthorizationError } from "app/utils/errors"
import { SessionContext } from "blitz"
import db from "db"
import { allowedEditCalendar } from "../utils"

interface ColabReturn {
	users: UserAndRoles[]
	invites: EmailAndInvite[]
}

export default async function getCalendarCollaborators(
	{ calendarId }: { calendarId: number },
	ctx: { session?: SessionContext } = {}
): Promise<ColabReturn> {
  ctx.session!.authorize()

  await allowedEditCalendar({ calendarId, ctx })
  const calendar = await db.calendar.findOne({
	  where: { id: calendarId },
  	include: { Role: { include: { user: true } }, UserInvite: true },
  })

  if (!calendar) throw new NotFoundError()
  if (calendar.userId !== ctx.session?.userId) {
	  throw new AuthorizationError()
  }

  const uniqueInvitesWithoutReader = calendar.UserInvite.reduce((obj, invite) => {
	  if (!invite.role || invite.role === "reader") return obj
	  const key = invite.email.toLowerCase()
  	if (obj.hasOwnProperty(key)) {
  		obj[key].invites.push({ role: invite.role, id: invite.id })
  	} else {
  		obj[key] = {
  			email: key,
  			invites: [{ role: invite.role, id: invite.id }]
  		}
  	}
  	return obj
  }, {})

  const uniqueUsersWithoutReader = calendar.Role.reduce((obj, role) => {
  	if (role.role === "reader") return obj
	  const key = role.userId
  	if (obj.hasOwnProperty(key)) {
  		obj[key].roles.push({ ...role })
  	} else {
  		obj[key] = {
  			roles: [{ ...role }],
  			user: role.user
  		}
  	}
  	return obj
  }, {})

  return {
  	users: Object.values(uniqueUsersWithoutReader),
  	invites: Object.values(uniqueInvitesWithoutReader),
  }
}
