import db from "db"
import { LoginInput, LoginInputType } from "../validations"
import axios from "axios"
import { createLoginRequest } from "../utils"
import { sendEmail } from "app/email"

if (!process.env.RECAPTCHA_SECRET) {
	throw new Error("Missing config RECAPTCHA_SECRET")
}

export default async function loginRequest(input: LoginInputType) {
	// This throws an error if input is invalid
	const { email: theMail } = LoginInput.parse(input)
	const email = theMail.toLowerCase()
	
	const response = await axios({
		url: "https://www.google.com/recaptcha/api/siteverify",
		method: "POST",
		params: {
			secret: process.env.RECAPTCHA_SECRET,
			response: input.recaptcha,
		},
	})
	if (!response.data.success) {
		throw new Error("Ugyldig recaptcha verdi.")
	}
	const user = await db.user.findUnique({ where: { email } })
	if (user && user.active) {
		const request = await createLoginRequest(user)
		await sendEmail({
			to: user.email,
			subject: "Innloggingsforespørsel - Din Advent",
			heading: "Innlogging til Din Advent",
			html: `
				<p>Noen, forhåpentlig vis du, har bedt om å bli logget inn på dinadvent.no. Trykk på linken for å fullføre innlogging:</p>
				<p><a href="${process.env.BASE_URL + "auth/" + request.loginToken}">Fullfør innlogging</a></p>
				<p>Merk! Denne linken må benyttes innen en time fra du mottok den og linken kan bare brukes en gang.</p>`,
		})
	}
	return
}
