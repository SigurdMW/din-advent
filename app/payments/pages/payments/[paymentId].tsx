import React, { Suspense } from "react"
import { Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getPayment from "app/payments/queries/getPayment"
import deletePayment from "app/payments/mutations/deletePayment"
import AuthLayout from "app/layouts/AuthLayout"
import Spinner from "app/components/Spinner"

export const Payment = () => {
  const router = useRouter()
  const paymentId = useParam("paymentId", "number")
  const [payment] = useQuery(getPayment, { where: { id: paymentId } })

  return (
    <>
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
    </>
  )
}

const ShowPaymentPage: BlitzPage = () => (
  <>
    <p>
      <Link href="/payments">
        <a>Payments</a>
      </Link>
    </p>

    <Suspense fallback={<Spinner />}>
      <Payment />
    </Suspense>
  </>
)

ShowPaymentPage.getLayout = (page) => <AuthLayout title="Betaling - Din Advent">{page}</AuthLayout>

export default ShowPaymentPage
