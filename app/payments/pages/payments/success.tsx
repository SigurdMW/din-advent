import React from "react"
import { BlitzPage, Link } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"

const PaymentSuccessPage: BlitzPage = () => (
  <>
    <h1>Takk for din betaling 🎉</h1>
    <p>Din var vellykket - du er nå klar for å sette i gang!</p>
    <Link href="/calendars">
      <a>Gå til dine kalendere</a>
    </Link>
  </>
)

PaymentSuccessPage.getLayout = (page) => (
  <AuthLayout title="Betalinger - Din Advent">{page}</AuthLayout>
)

export default PaymentSuccessPage
