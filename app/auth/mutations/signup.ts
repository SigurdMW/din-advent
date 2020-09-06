import db from "db"
import { SignupInput, SignupInputType } from "app/auth/validations"

export default async function signup(input: SignupInputType) {
  // This throws an error if input is invalid
  const { email } = SignupInput.parse(input)

  await db.user.create({
    data: { email, role: "user" },
  })
  return
}
