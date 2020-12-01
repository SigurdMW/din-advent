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
          Noe gikk dessverre galt under betalingen. Vi har logget saken, men om feilen gjentar seg
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
			<p>Din betaling var vellykket og du skal få kvittering på mail til din e-postadresse.</p>

			<hr className="da-divider" />
			<h2 style={{ fontSize: "25px" }}>Slik deler du din første kalender</h2>
			<p>Gratulrerer! Du er nå klar til å dele din første kalender. Slik går du frem: Gå til <Link href="/calendars">
				<a>Dine kalendere</a>
			</Link>, trykk på kalenderen du ønsker å dele. Trykk deretter på den grønne knappen "Del kalender" når du er inne på kalenderen. Du kan her velge hvordan du ønsker å dele kalenderen.</p>
			<img style={{ width: "100%", marginBottom: "3em" }} src="/calendar-success.png" alt="For å dele kalender, gå til Dine kalendere, velg ønsket kalender og så trykk på knappen der det står del" />
			
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
