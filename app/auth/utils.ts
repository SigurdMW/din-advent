import { sendEmail } from "app/email"
import { logger } from "app/utils/logger"
import db, { User } from "db"

export const createLoginRequest = async (user: User) => {
	const request = await db.loginrequest.create({
		data: {
			user: {
				connect: {
					id: user.id,
				},
			},
		},
	})
	logger("Successfully created login request for " + user.email)
	// TODO: Create or copy last years email template
	await sendEmail({
		to: user.email,
		subject: "Innloggingsforespørsel - Din Advent",
		html: `
			  <h1>Innlogging til Din Advent</h1>
			  <p>Noen, forhåpentlig vis du, har spurt om en innlogging til dinadvent.no. Trykk på linken for å fullføre innlogging:</p>
			  <p><a href="${process.env.BASE_URL + "auth/" + request.loginToken}">Fullfør innlogging</a></p>`,
	})
	logger("Successfully sent email to " + user.email)
}
