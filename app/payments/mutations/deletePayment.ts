import { SessionContext } from "blitz"
import db, { PaymentDeleteArgs } from "db"

type DeletePaymentInput = {
  where: PaymentDeleteArgs["where"]
}

export default async function deletePayment(
	{ where }: DeletePaymentInput,
	ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const payment = await db.payment.delete({ where })

  return payment
}
