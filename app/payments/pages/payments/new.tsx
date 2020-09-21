import React from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, BlitzPage } from "blitz"
import createPayment from "app/payments/mutations/createPayment"
import PaymentForm from "app/payments/components/PaymentForm"

const NewPaymentPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>New Payment</title>
      </Head>

      <main>
        <h1>Create New Payment</h1>

        <PaymentForm
          initialValues={{}}
          onSubmit={async () => {
            try {
              const payment = await createPayment({ data: { name: "MyName" } })
              alert("Success!" + JSON.stringify(payment))
              router.push("/payments/[paymentId]", `/payments/${payment.id}`)
            } catch (error) {
              alert("Error creating payment " + JSON.stringify(error, null, 2))
            }
          }}
        />

        <p>
          <Link href="/payments">
            <a>Payments</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

NewPaymentPage.getLayout = (page) => <Layout title={"Create New Payment"}>{page}</Layout>

export default NewPaymentPage
