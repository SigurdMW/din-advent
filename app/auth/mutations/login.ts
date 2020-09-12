import { SessionContext } from "blitz"
import { authenticateUser } from "app/auth/auth-utils"
import { LoginRequestInput, LoginRequestInputType } from "../validations"

class LoginRequestError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "LoginRequestError"
  }
}

export default async function login(
  input: LoginRequestInputType,
  ctx: { session?: SessionContext } = {}
) {
  // This throws an error if input is invalid
  const { request } = LoginRequestInput.parse(input)
  try {
    const user = await authenticateUser(request)
    await ctx.session!.create({ userId: user.id, roles: [user.role] })
    return
  } catch (e) {
    throw new LoginRequestError(
      e.message ? e.message : "Noe gikk galt under innlogging. Vennligst forsøk igjen."
    )
  }
}
