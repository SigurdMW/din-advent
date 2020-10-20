import db from "db"
import { SignupInput, SignupInputType } from "app/auth/validations"
import { createLoginRequest } from "../utils"

export default async function signup(input: SignupInputType) {
  // This throws an error if input is invalid
  const { email } = SignupInput.parse(input)
  try {
    const user = await db.user.create({
      data: { email, role: "user" },
    })
    await createLoginRequest(user.id, email)
    return
  } catch (e) {
    // Fail silently if the user already exist
    return
  }
}
