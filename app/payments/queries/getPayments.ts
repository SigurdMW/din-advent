import { SessionContext } from "blitz"
import db, { FindManyPaymentArgs } from "db"

type GetPaymentsInput = {
  where?: FindManyPaymentArgs["where"]
  orderBy?: FindManyPaymentArgs["orderBy"]
  skip?: FindManyPaymentArgs["skip"]
  take?: FindManyPaymentArgs["take"]
  // Only available if a model relationship exists
  // include?: FindManyPaymentArgs['include']
}

export default async function getPayments(
  { where, orderBy, skip = 0, take }: GetPaymentsInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const userId = ctx.session?.userId

  const payments = await db.payment.findMany({
    where: {
      ...where,
      userId,
    },
    orderBy,
    take,
    skip,
  })

  const count = await db.payment.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    payments,
    nextPage,
    hasMore,
  }
}
