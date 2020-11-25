import db from "db"
import { SessionContext } from "blitz"
import Sentry from "integrations/sentry"

// const data = await ctx.session.getPrivateData()
// const diff = Date.now() - data.updated
// const thresholdInSeconds = 1 * 60 // every minute
// const shouldRefreshRoles = !data.hasOwnProperty("roles") || diff / 1000 > thresholdInSeconds

// if (shouldRefreshRoles) {
// 	const privateData = await getPrivateData(userId)
// 	await ctx.session.setPrivateData(privateData)
// }

export default async function getCurrentUser(_ = null, ctx: { session?: SessionContext } = {}) {
	const userId = ctx.session?.userId
	if (!ctx.session || !userId) return null

	try {
		const user = await db.user.findOne({
			where: { id: userId },
			select: { id: true, name: true, email: true, role: true, plan: true },
		})
		return user
	} catch (e) {
		Sentry.captureException(e)
		return null
	}
}
