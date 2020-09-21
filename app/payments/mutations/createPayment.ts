import { SessionContext } from "blitz"
import db, { PaymentCreateArgs } from "db"

type CreatePaymentInput = {
  data: PaymentCreateArgs["data"]
}
export default async function createPayment(
  { data }: CreatePaymentInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const payment = await db.payment.create({ data })

  return payment
}
