import db from "db"
import { SessionContext } from "blitz"

export default async function getNumberOfPayments({}: any, ctx: { session?: SessionContext } = {}) {
  ctx.session!.authorize("admin")
  const payments = await db.payment.findMany({ select: { id: true, completed: true } })
  return {
    paymentsNumber: payments.length,
    completedNumber: payments.filter((p) => p.completed).length,
  }
}
