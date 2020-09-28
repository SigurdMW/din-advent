import React from "react"
import { Link, useRouter, BlitzPage } from "blitz"
import createPayment from "app/payments/mutations/createPayment"
import PaymentForm from "app/payments/components/PaymentForm"
import AuthLayout from "app/layouts/AuthLayout"

const NewPaymentPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <h1>Create New Payment</h1>

      <PaymentForm
        submitText="Lag betaling"
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            const payment = await createPayment({ data: { plan: values.plan } })
            alert("Success!" + JSON.stringify(payment))
            router.push("/payments/[paymentId]", `/payments/${payment.id}`)
          } catch (error) {
            console.error(error)
            alert("Error creating payment " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/payments">
          <a>Payments</a>
        </Link>
      </p>
    </div>
  )
}

NewPaymentPage.getLayout = (page) => (
  <AuthLayout title="Ny betaling - Din Advent">{page}</AuthLayout>
)
export default NewPaymentPage
