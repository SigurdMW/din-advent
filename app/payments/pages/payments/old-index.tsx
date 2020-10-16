import React, { Suspense } from "react"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getPayments from "app/payments/queries/getPayments"
import AuthLayout from "app/layouts/AuthLayout"
import Spinner from "app/components/Spinner"

const ITEMS_PER_PAGE = 100

export const PaymentsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ payments, hasMore }] = usePaginatedQuery(getPayments, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {payments.map((payment) => (
          <li key={payment.id}>
            <Link href="/payments/[paymentId]" as={`/payments/${payment.id}`}>
              <a>
                Payment from {payment.provider} with amount {payment.amount} kr from userId{" "}
                {payment.userId}
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const PaymentsPage: BlitzPage = () => (
  <>
    <h1>Payments</h1>

    <p>
      <Link href="/payments/new">
        <a>Create Payment</a>
      </Link>
    </p>

    <Suspense fallback={<Spinner />}>
      <PaymentsList />
    </Suspense>
  </>
)

PaymentsPage.getLayout = (page) => <AuthLayout title="Betalinger - Din Advent">{page}</AuthLayout>

export default PaymentsPage
