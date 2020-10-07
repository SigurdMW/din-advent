import React from "react"
import { BlitzPage } from "blitz"
import createPayment from "app/payments/mutations/createPayment"
import PaymentForm from "app/payments/components/PaymentForm"
import AuthLayout from "app/layouts/AuthLayout"
import { useStripe } from "../../utils/useStripe"
import { Plan } from "app/interfaces/Payment"

const NewPaymentPage: BlitzPage = () => {
  const { isReady, Stripe } = useStripe()

  const createPaymentCore = async (plan: Plan) => {
    const id = await createPayment({ data: { plan } })
    Stripe?.redirectToCheckout({ sessionId: id })
  }

  if (!isReady || !Stripe) return <div>Laster....</div>
  return (
    <div>
      <h1>Ny betaling</h1>

      <PaymentForm
        submitText="Lag betaling"
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            await createPaymentCore(values.plan as Plan)
          } catch (error) {
            console.error(error)
            alert("Error creating payment " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

NewPaymentPage.getLayout = (page) => (
  <AuthLayout title="Ny betaling - Din Advent">{page}</AuthLayout>
)
export default NewPaymentPage
