import axios from "axios"
import { SignupInput, SignupInputType } from "app/auth/validations"
import { createLoginRequest } from "../utils"
import { createOrUpdateUser } from "app/users/utils"

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
		await createLoginRequest(user)
		return
	} catch (e) {
		// Fail silently if the user already exist
		return
	}
}
