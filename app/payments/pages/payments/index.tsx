import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getPayments from "app/payments/queries/getPayments"

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
              <a>{payment.name}</a>
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

const PaymentsPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Payments</title>
      </Head>

      <main>
        <h1>Payments</h1>

        <p>
          <Link href="/payments/new">
            <a>Create Payment</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PaymentsList />
        </Suspense>
      </main>
    </div>
  )
}

PaymentsPage.getLayout = (page) => <Layout title={"Payments"}>{page}</Layout>

export default PaymentsPage
