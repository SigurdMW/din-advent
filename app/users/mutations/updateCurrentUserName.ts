import { AuthorizationError } from "app/utils/errors"
import { Ctx } from "blitz"
import db, { UserUpdateArgs } from "db"
import { UpdateUserInput } from "../validations"

type UpdateCalendarInput = {
  name: UserUpdateArgs["data"]["name"]
}

export default async function updateCurrentUserName(
	{ name }: UpdateCalendarInput,
	ctx: Ctx
) {
	ctx.session.authorize()
	const userId = ctx.session?.userId
	if (!userId) throw new AuthorizationError()
	UpdateUserInput.parse({ name })
	const user = await db.user.update({ where: { id: userId }, data: { name } })
	return user
}
