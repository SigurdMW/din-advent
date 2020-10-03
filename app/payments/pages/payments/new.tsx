import React from "react"
import { Link, BlitzPage } from "blitz"
import createPayment from "app/payments/mutations/createPayment"
import PaymentForm from "app/payments/components/PaymentForm"
import AuthLayout from "app/layouts/AuthLayout"
import { useStripe } from "../../utils/useStripe"

const NewPaymentPage: BlitzPage = () => {
  const { isReady, Stripe } = useStripe()

  if (!isReady) return <div>Laster....</div>
  return (
    <div>
      <h1>Create New Payment</h1>

      <PaymentForm
        submitText="Lag betaling"
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            const id = await createPayment({ data: { plan: values.plan } })
            Stripe?.redirectToCheckout({ sessionId: id })
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
