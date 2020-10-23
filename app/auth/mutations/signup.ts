import { SignupInput, SignupInputType } from "app/auth/validations"
import { createLoginRequest } from "../utils"
import { createOrUpdateUser } from "app/users/mutations/createOrUpdateUser"

export default async function signup(input: SignupInputType) {
  // This throws an error if input is invalid
  const { email } = SignupInput.parse(input)
  try {
    const user = await createOrUpdateUser({ email })
    await createLoginRequest(user)
    return
  } catch (e) {
    // Fail silently if the user already exist
    return
  }
}
