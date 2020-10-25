import db from "db"
import { verifyPayment } from "app/Stripe"
import { SessionContext } from "blitz"

export default async function getPaymentVerification(
  { sessionId }: { sessionId: string },
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const userId = ctx.session?.userId

  try {
    const payment = await verifyPayment({ sessionId, userId })
    const user = await db.user.findOne({ where: { id: userId } })
    await ctx.session?.setPublicData({ plan: user!.plan })
    return payment
  } catch (e) {
    return
  }
}
