import db from "db"
import { SessionContext } from "blitz"

export default async function getNumberOfPayments(
	// eslint-disable-next-line no-empty-pattern
	{ }: any,
	ctx: { session?: SessionContext } = {}
) {
	ctx.session!.authorize("admin")
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
