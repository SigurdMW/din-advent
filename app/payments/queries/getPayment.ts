import { NotFoundError } from "app/utils/errors"
import { Ctx } from "blitz"
import db, { FindUniquePaymentArgs } from "db"

type GetPaymentInput = {
  where: FindUniquePaymentArgs["where"]
}

export default async function getPayment(
	{ where /* include */ }: GetPaymentInput,
	ctx: Ctx
) {
	ctx.session.authorize()

	const userId = ctx.session?.userId

	const payment = await db.payment.findUnique({ where })
	if (!payment || payment.userId !== userId) throw new NotFoundError()
	if (payment?.userId !== userId) throw new NotFoundError()

	return payment
}
