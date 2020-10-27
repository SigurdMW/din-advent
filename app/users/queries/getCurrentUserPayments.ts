import db from "db"
import { SessionContext } from "blitz"

export default async function getCurrentUserPayments(
	_ = null,
	ctx: { session?: SessionContext } = {}
) {
	if (!ctx.session?.userId) return null

	const payments = await db.payment.findMany({
		where: { userId: ctx.session!.userId, completed: true },
		select: { amount: true, plan: true, createdAt: true, id: true },
	})

	return payments
}
