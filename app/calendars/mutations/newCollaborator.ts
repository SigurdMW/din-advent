import { NewCollaboratorInput, ShareByEmailFunctionArgsType } from "../validations"
import { Ctx } from "blitz"
import db from "db"
import { allowedEditCalendar, AvailableRoles, createUserInvite, giveCollaboratorAccess } from "../utils"
import { sendEmail } from "app/email"

export default async function shareCalendarByEmail(
	{ calendarId, ...rest }: ShareByEmailFunctionArgsType & { roles: AvailableRoles[] },
	ctx: Ctx
) {
	const {email: theMail, roles } = NewCollaboratorInput.parse(rest)
	const email = theMail.toLowerCase()

	// const userId = await authAndValidatePlanLimit(ctx) no limit on collaborators until we find the correct pricing
	const userId = await allowedEditCalendar({ calendarId, ctx })

	const userWithRole = await db.user.findUnique({ where: { email } })
	if (!userWithRole) {
		const invites = await db.userInvite.findMany({ where: {
			calendarId,
			createdBy: userId,
			email
		}})
		const relevantInvites = roles.filter((r) => !invites.map((i) => i.role).includes(r))
		relevantInvites.forEach(async (role: AvailableRoles) => {
			await createUserInvite({
				userId,
				email,
				calendarId,
				role
			})
		})
		if (!relevantInvites.length) return
		const userSharing = await db.user.findUnique({ where: { id: userId }})
		if (!userSharing) return
		const displayName = userSharing.name || userSharing.email
		const messageAndTitle = `${displayName} ønsker å samarbeide`
		if (invites.length === 0) {
			await sendEmail({
				to: email,
				subject: `${messageAndTitle} - Din Advent`,
				heading: messageAndTitle + "!",
				html: `
					<p>${displayName} ønsker å samarbeide med deg på en digital adventskalender! For å få tilgang må du opprette en gratis bruker på Din Advent og logge deg inn. Det gjør du her:</p>
					<p><a href="${process.env.BASE_URL}signup">Opprett gratis bruker på Din Advent</a></p>
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
