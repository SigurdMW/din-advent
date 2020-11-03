import { NewCollaboratorInput, ShareByEmailFunctionArgsType } from "../validations"
import { SessionContext } from "blitz"
import db from "db"
import { allowedEditCalendar, authAndValidatePlanLimit, AvailableRoles, createUserInvite, giveCollaboratorAccess } from "../utils"
import { sendEmail } from "app/email"

export default async function shareCalendarByEmail(
	{ email, roles, calendarId }: ShareByEmailFunctionArgsType & { roles: AvailableRoles[] },
	ctx: { session?: SessionContext } = {}
) {
	NewCollaboratorInput.parse({ email, roles })
	const userId = await authAndValidatePlanLimit(ctx)
	await allowedEditCalendar({ calendarId, ctx })

	const userWithRole = await db.user.findOne({ where: { email } })
	if (!userWithRole) {
		const invites = await db.userInvite.findMany({ where: {
			calendarId,
			createdBy: userId,
			email
		}})
		const relevantInvites = roles.filter((r) => !invites.map((i) => i.role).includes(r))
		relevantInvites.forEach(async (role) => {
			await createUserInvite({
				userId,
				email,
				calendarId,
				role
			})
		})
		if (!relevantInvites.length) return
		const userSharing = await db.user.findOne({ where: { id: userId }})
		if (!userSharing) return
		const displayName = userSharing.name || userSharing.email
		const messageAndTitle = `${displayName} ønsker å samarbeide`
		if (invites.length === 0) {
			await sendEmail({
				to: email,
				subject: `${messageAndTitle} - Din Advent`,
				html: `
					<h1>${messageAndTitle}!</h1>
					<p>${displayName} ønsker å samarbeide med deg! For å få tilgang til kalenderen, må du opprette en bruker og logge inn på Din Advent. Det gjør du her:</p>
					<p><a href="${process.env.BASE_URL}signup">Opprett bruker på Din Advent</a></p>
					<p><strong>NB!</strong> Det er viktig at du benytter denne e-postadressen når du oppretter brukeren for å få tilgang til kalenderen.</p>`,
			})
		}
		return
	}
	if (userWithRole.id === userId) return
	const existingRoles = await db.role.findMany({
		where: {
			userId: userWithRole.id,
			calendarId
		}
	})
	const existingRoleNames = existingRoles.map((r) => r.role)
	const rolesToCreate = roles.filter((r) => !existingRoleNames.includes(r)) as AvailableRoles[]
	await giveCollaboratorAccess({ 
		roles: rolesToCreate,
		user: userWithRole,
		calendarId,
		createdBy: userId,
		sendMail: existingRoles.length === 0
	})
}
