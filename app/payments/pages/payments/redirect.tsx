import React, { useEffect, useState } from "react"
import { BlitzPage, Link, useRouterQuery } from "blitz"
import createPayment from "app/payments/mutations/createPayment"
import AuthLayout from "app/layouts/AuthLayout"
import { useStripe } from "../../utils/useStripe"
import { Plan } from "app/interfaces/Payment"
import Spinner from "app/components/Spinner"

const PaymentRedirectPage: BlitzPage = () => {
  const { isReady, Stripe } = useStripe()
  const [timeoutError, setTimeoutError] = useState(false)
  const [didCreatePayment, setDidCreatePayment] = useState(false)
  const query = useRouterQuery()

  useEffect(() => {
    setTimeout(() => {
      setTimeoutError(true)
    }, 20000)
  }, [])

  useEffect(() => {
    const createPaymentCore = async (plan: Plan) => {
      if (didCreatePayment) return
      setDidCreatePayment(true)
      const id = await createPayment({ data: { plan } })
      Stripe?.redirectToCheckout({ sessionId: id })
    }
    if (query.plan && isReady && Stripe) {
      createPaymentCore(query.plan as Plan)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, query, Stripe])

  if (timeoutError) {
    return (
      <>
        <h1>Obs, noe gikk galt 😕</h1>
        <p>Vi klarte av en eller annen grunn ikke å gjennomføre betalingen.</p>
        <Link href="/pricing">
          <a>Tilbake til priser og pakker</a>
        </Link>
      </>
    )
  }
  return (
    <Spinner>
      <p>Vennligst vent, du blir straks omdirigert til betaling...</p>
    </Spinner>
  )
}

PaymentRedirectPage.getLayout = (page) => (
  <AuthLayout title="Betaling omdirigering - Din Advent">{page}</AuthLayout>
)
export default PaymentRedirectPage
