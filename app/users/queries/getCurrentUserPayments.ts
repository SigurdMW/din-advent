import db from "db"
import { Ctx } from "blitz"

export default async function getCurrentUserPayments(
	_ = null,
	ctx: Ctx
) {
	if (!ctx.session?.userId) return null

	const payments = await db.payment.findMany({
		where: { userId: ctx.session!.userId, completed: true },
		select: { amount: true, plan: true, createdAt: true, id: true },
	})

	return payments
}
