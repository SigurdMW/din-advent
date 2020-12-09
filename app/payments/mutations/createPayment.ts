import { Plan } from "app/interfaces/Payment"
import { createPaymentRequest } from "app/Stripe"
import { Ctx } from "blitz"
import { PaymentCreateArgs } from "db"

type CreatePaymentInput = {
  data: Pick<PaymentCreateArgs["data"], "plan">
}
export default async function createPayment(
	{ data }: CreatePaymentInput,
	ctx: Ctx
) {
	ctx.session.authorize()
	const userId = ctx.session?.userId
	const id = await createPaymentRequest({ userId, plan: data.plan as Plan })
	return id
}
