import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getPayment from "app/payments/queries/getPayment"
import updatePayment from "app/payments/mutations/updatePayment"
import PaymentForm from "app/payments/components/PaymentForm"

export const EditPayment = () => {
  const router = useRouter()
  const paymentId = useParam("paymentId", "number")
  const [payment, { mutate }] = useQuery(getPayment, { where: { id: paymentId } })

  return (
    <div>
      <h1>Edit Payment {payment.id}</h1>
      <pre>{JSON.stringify(payment)}</pre>

      <PaymentForm
        initialValues={payment}
        onSubmit={async () => {
          try {
            const updated = await updatePayment({
              where: { id: payment.id },
              data: { name: "MyNewName" },
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

const EditPaymentPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Edit Payment</title>
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditPayment />
        </Suspense>

        <p>
          <Link href="/payments">
            <a>Payments</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

EditPaymentPage.getLayout = (page) => <Layout title={"Edit Payment"}>{page}</Layout>

export default EditPaymentPage
