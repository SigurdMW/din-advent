import { SessionContext } from "blitz"

export default async function logout(_ = null, ctx: { session?: SessionContext } = {}) {
	try {
		await ctx.session!.revoke()
		return
	} catch (e) {
		return
	}
}
