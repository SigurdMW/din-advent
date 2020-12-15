import db from "db"
import { verifyPayment } from "app/Stripe"
import { Ctx } from "blitz"

export default async function getPaymentVerification(
	{ sessionId }: { sessionId: string },
	ctx: Ctx
) {
	ctx.session.authorize()
	const userId = ctx.session?.userId

	try {
  	const payment = await verifyPayment({ sessionId, userId })
	  const user = await db.user.findUnique({ where: { id: userId } })
  	await ctx.session?.setPublicData({ plan: user!.plan })
  	return payment
	} catch (e) {
  	return
	}
}
