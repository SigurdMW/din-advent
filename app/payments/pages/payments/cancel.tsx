import React from "react"
import { BlitzPage, Link } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"

const PaymentCanceledPage: BlitzPage = () => (
	<>
		<h1>Betaling avbrutt</h1>
		<p>Din betaling ble avbrutt og ingen ting ble belastet.</p>
		<Link href="/calendars">
			<a>Gå til dine kalendere</a>
		</Link>
	</>
)

PaymentCanceledPage.getLayout = (page) => (
	<AuthLayout title="Betaling avbrutt - Din Advent">{page}</AuthLayout>
)

export default PaymentCanceledPage
