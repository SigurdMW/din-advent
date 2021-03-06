import { Ctx } from "blitz"
import db, { PaymentUpdateArgs } from "db"

type UpdatePaymentInput = {
  where: PaymentUpdateArgs["where"]
  data: PaymentUpdateArgs["data"]
}

export default async function updatePayment(
	{ where, data }: UpdatePaymentInput,
	ctx: Ctx
) {
	ctx.session.authorize()

	const payment = await db.payment.update({ where, data })

	return payment
}
