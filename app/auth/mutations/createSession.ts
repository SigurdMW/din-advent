import { getPublicData } from "app/users/utils"
import { PublicData, Ctx } from "blitz"
import { User } from "db"

export default async function createSession(user: User, ctx: Ctx) {
	// const privateData = await getPrivateData(user.id)
	const publicData = getPublicData(user, "email") as PublicData
	await ctx.session!.create(
		publicData,
		// privateData
	)
}
