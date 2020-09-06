import { SessionContext } from "blitz"
import { authenticateUser } from "app/auth/auth-utils"
import { LoginRequestInput, LoginRequestInputType } from "../validations"

export default async function login(
  input: LoginRequestInputType,
  ctx: { session?: SessionContext } = {}
) {
  // This throws an error if input is invalid
  const { request } = LoginRequestInput.parse(input)
  const user = await authenticateUser(request)
  await ctx.session!.create({ userId: user.id, roles: [user.role] })
  return
}
