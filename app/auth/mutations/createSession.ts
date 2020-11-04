import { getPrivateData, getPublicData } from "app/users/utils"
import { SessionContext, PublicData } from "blitz"
import { User } from "db"

export default async function createSession(user: User, ctx: { session?: SessionContext } = {}) {
	const privateData = await getPrivateData(user.id)
	const publicData = getPublicData(user, "email") as PublicData
	await ctx.session!.create(
		publicData,
		privateData
	)
}
