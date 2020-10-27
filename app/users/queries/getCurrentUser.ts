import db from "db"
import { SessionContext } from "blitz"
import { getPrivateData } from "../utils"

export default async function getCurrentUser(_ = null, ctx: { session?: SessionContext } = {}) {
  const userId = ctx.session?.userId
  if (!ctx.session || !userId) return null

  const data = await ctx.session.getPrivateData()
  const diff = Date.now() - data.updated
  const thresholdInSeconds = 3 * 60
  const shouldRefreshRoles = !data.hasOwnProperty("roles") || diff / 1000 > thresholdInSeconds

  if (shouldRefreshRoles) {
    const privateData = await getPrivateData(userId)
    await ctx.session.setPrivateData(privateData)
  }

  const user = await db.user.findOne({
    where: { id: ctx.session!.userId },
    select: { id: true, name: true, email: true, role: true, plan: true },
  })

  return user
}
