import { Ctx } from "blitz"

export default async function logout(_ = null, ctx: Ctx) {
	try {
		await ctx.session.revoke()
		return
	} catch (e) {
		return
	}
}
