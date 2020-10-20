import db from "db"
import { LoginInput, LoginInputType } from "../validations"
import axios from "axios"
import { createLoginRequest } from "../utils"

if (!process.env.RECAPTCHA_SECRET) {
  throw new Error("Missing config RECAPTCHA_SECRET")
}

export default async function loginRequest(input: LoginInputType) {
  // This throws an error if input is invalid
  const { email } = LoginInput.parse(input)
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
  const user = await db.user.findOne({ where: { email } })
  if (user && user.active) {
    await createLoginRequest(user.id, email)
  }
  return
}
