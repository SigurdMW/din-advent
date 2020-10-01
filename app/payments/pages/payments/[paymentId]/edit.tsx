import React, { Suspense } from "react"
import { Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getPayment from "app/payments/queries/getPayment"
import updatePayment from "app/payments/mutations/updatePayment"
import PaymentForm from "app/payments/components/PaymentForm"
import AuthLayout from "app/layouts/AuthLayout"

export const EditPayment = () => {
  const router = useRouter()
  const paymentId = useParam("paymentId", "number")
  const [payment, { mutate }] = useQuery(getPayment, { where: { id: paymentId } })

  return (
    <div>
      <h1>Edit Payment {payment.id}</h1>
      <pre>{JSON.stringify(payment)}</pre>

      <PaymentForm
        submitText="Oppdater"
        initialValues={payment}
        onSubmit={async () => {
          try {
            const updated = await updatePayment({
              where: { id: payment.id },
              data: {},
            })
            mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/payments/[paymentId]", `/payments/${updated.id}`)
          } catch (error) {
            console.error(error)
            alert("Error creating payment " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditPaymentPage: BlitzPage = () => (
  <>
    <Suspense fallback={<div>Loading...</div>}>
      <EditPayment />
    </Suspense>

    <p>
      <Link href="/payments">
        <a>Payments</a>
      </Link>
    </p>
  </>
)

EditPaymentPage.getLayout = (page) => (
  <AuthLayout title="Rediger betaling - Din Advent">{page}</AuthLayout>
)

export default EditPaymentPage
