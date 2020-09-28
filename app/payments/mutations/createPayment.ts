import { price } from "app/price"
import { SessionContext } from "blitz"
import db, { PaymentCreateArgs } from "db"

const getPayload = async () => {
  return { msg: "some payload", transactionId: 13258787234 }
}

type CreatePaymentInput = {
  data: Pick<PaymentCreateArgs["data"], "plan">
}
export default async function createPayment(
  { data }: CreatePaymentInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const userId = ctx.session?.userId
  const amount = price[data.plan]
  if (amount === undefined) throw new Error("No price provided")
  const payload = await getPayload()
  const dataWithPayload: Omit<PaymentCreateArgs["data"], "user"> = {
    ...data,
    amount,
    provider: "stripe",
    payload: JSON.stringify(payload),
  }

  const payment = await db.payment.create({
    data: {
      ...dataWithPayload,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })

  return payment
}
