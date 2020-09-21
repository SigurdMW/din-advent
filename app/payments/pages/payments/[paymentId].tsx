import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getPayment from "app/payments/queries/getPayment"
import deletePayment from "app/payments/mutations/deletePayment"

export const Payment = () => {
  const router = useRouter()
  const paymentId = useParam("paymentId", "number")
  const [payment] = useQuery(getPayment, { where: { id: paymentId } })

  return (
    <div>
      <h1>Payment {payment.id}</h1>
      <pre>{JSON.stringify(payment, null, 2)}</pre>

      <Link href="/payments/[paymentId]/edit" as={`/payments/${payment.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deletePayment({ where: { id: payment.id } })
            router.push("/payments")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowPaymentPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Payment</title>
      </Head>

      <main>
        <p>
          <Link href="/payments">
            <a>Payments</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Payment />
        </Suspense>
      </main>
    </div>
  )
}

ShowPaymentPage.getLayout = (page) => <Layout title={"Payment"}>{page}</Layout>

export default ShowPaymentPage
