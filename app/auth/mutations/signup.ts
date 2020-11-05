import axios from "axios"
import { SignupInput, SignupInputType } from "app/auth/validations"
import { createLoginRequest } from "../utils"
import { createOrUpdateUser } from "app/users/utils"
import { sendEmail } from "app/email"

export default async function signup(input: SignupInputType) {
	// This throws an error if input is invalid
	const { email, recaptcha } = SignupInput.parse(input)
	try {
		const response = await axios({
			url: "https://www.google.com/recaptcha/api/siteverify",
			method: "POST",
			params: {
				secret: process.env.RECAPTCHA_SECRET,
				response: recaptcha,
			},
		})
		if (!response.data.success) {
			throw new Error("Ugyldig recaptcha verdi.")
		}
		const user = await createOrUpdateUser({ email })
		const request = await createLoginRequest(user)
		const link = process.env.BASE_URL + "auth/" + request.loginToken
		await sendEmail({
			to: user.email,
			subject: "Bekreft bruker - Din Advent",
			heading: "Velkommen!",
			html: `
				<p>Velkommen som bruker av Din Advent! Trykk på linken for å bekrefte din bruker og logge inn:</p>
				<p><a href="${link}">Bekreft bruker og logg inn</a></p>
				<p>${link}</p>`,
		})
		return
	} catch (e) {
		// Fail silently if the user already exist
		return
	}
}
