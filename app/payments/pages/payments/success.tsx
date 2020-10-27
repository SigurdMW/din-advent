import React, { Suspense } from "react"
import { BlitzPage, Link, useQuery, useRouterQuery } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"
import getPaymentVerification from "app/payments/queries/getPaymentVerification"
import Spinner from "app/components/Spinner"

const ConfirmationMessage = ({ sessionId }) => {
	const [verification] = useQuery(getPaymentVerification, { sessionId })

	if (!verification) {
		return (
			<>
				<h1>Noe gikk galt 🤔</h1>
				<p>
          Noe gikk dessverre galt under betalingen. Vi har logget saken, så om feilen gjentar seg
          anbefaler vi at du{" "}
					<Link href="/contact">
						<a>tar kontakt.</a>
					</Link>
				</p>
			</>
		)
	}
	return (
		<>
			<h1>Takk for din betaling 🎉</h1>
			<p>Din betaling var vellykket - du er nå klar for å sette i gang!</p>
			<Link href="/calendars">
				<a>Gå til dine kalendere</a>
			</Link>
		</>
	)
}

const PaymentSuccessPage: BlitzPage = () => {
	const query = useRouterQuery()

	if (query.sessionId) {
		return (
			<Suspense fallback={<Spinner />}>
				<ConfirmationMessage sessionId={query.sessionId} />
			</Suspense>
		)
	}
	return (
		<Spinner>
			<p>Vennligst vent mens vi verifiserer betalingen...</p>
		</Spinner>
	)
}

PaymentSuccessPage.getLayout = (page) => (
	<AuthLayout title="Betaling vellykket - Din Advent">{page}</AuthLayout>
)

export default PaymentSuccessPage
