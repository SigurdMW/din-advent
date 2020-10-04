import { NotFoundError, SessionContext } from "blitz"
import db, { FindOnePaymentArgs } from "db"

type GetPaymentInput = {
  where: FindOnePaymentArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOnePaymentArgs['include']
}

export default async function getPayment(
  { where /* include */ }: GetPaymentInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const userId = ctx.session?.userId

  const payment = await db.payment.findOne({ where })
  if (!payment || payment.userId !== userId) throw new NotFoundError()
  if (payment?.userId !== userId) throw new NotFoundError()

  return payment
}
