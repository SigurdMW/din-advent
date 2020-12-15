import db from "db"
import { Ctx } from "blitz"

export default async function getNumberOfPayments(
	// eslint-disable-next-line no-empty-pattern
	{ }: any,
	ctx: Ctx
) {
	ctx.session.authorize("admin")
	const payments = await db.payment.count({
		where: {
			user: {
				role: {
					notIn: "admin"
				}
			}
		}
	})
	const paymentsComp = await db.payment.count({
		where: {
			completed: true,
			user: {
				role: {
					notIn: "admin"
				}
			}
		}
	})
	return {
		paymentsNumber: payments,
		completedNumber: paymentsComp
	}
}
