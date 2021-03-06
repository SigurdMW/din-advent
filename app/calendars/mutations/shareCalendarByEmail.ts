import { ValidationError } from "app/utils/errors"
import { ShareByEmailFunctionArgsType, ShareByEmailFunctionArgs } from "../validations"
import { Ctx } from "blitz"
import db from "db"
import { allowedEditCalendar, authAndValidatePlanLimit, AvailableRoles, createUserInvite, grantCalendarAccess } from "../utils"
import { sendEmail } from "app/email"

export default async function shareCalendarByEmail(
	{ role, ...rest }: ShareByEmailFunctionArgsType & { role: AvailableRoles },
	ctx: Ctx
) {
	const { email: theMail, calendarId } = ShareByEmailFunctionArgs.parse(rest)
	const email = theMail.toLowerCase()
	
	const userId = await authAndValidatePlanLimit(ctx)
	await allowedEditCalendar({ calendarId, ctx })

	const user = await db.user.findUnique({ where: { email } })
	const invites = await db.userInvite.findMany({ where: {
		calendarId,
		createdBy: userId,
		email
	}})

	if (invites.length > 0) {
		throw new ValidationError("Kunne ikke dele med bruker.")
	}

	if (!user) {
		const theUser = await createUserInvite({
			userId,
			email,
			calendarId,
			role
		})
		const displayName = theUser?.name || theUser?.email
		const messageAndTitle = `${displayName} har delt en kalender med deg`
		await sendEmail({
			to: email,
			subject: `${messageAndTitle} - Din Advent`,
			heading: messageAndTitle + "!",
			html: `
				<p>Hei,</p>
				<p>${displayName} har delt en kalender med deg. For å få tilgang til kalenderen må du opprette en gratis bruker på Din Advent og logge inn. Det gjør du her:</p>
				<p><a href="${process.env.BASE_URL}signup">Opprett gratis bruker på Din Advent</a></p>
				<p><strong>NB!</strong> Det er viktig at du benytter denne e-postadressen når du oppretter brukeren for å få tilgang til den delte kalenderen.</p>`,
		})
		return
	}
	if (user.id === userId) throw new ValidationError("Du har allerede tilgang til denne kalenderen :)")
	const roles = await db.role.findMany({
		where: {
			userId: user.id,
			calendarId,
			role
		}
	})
	if (roles.length > 0) return
	await grantCalendarAccess({
		user,
		role,
		calendarId,
		createdBy: userId,
	})
}
