import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Link } from "blitz"
import React, { Suspense } from "react"

const AnonAction = () => (
	<>
		<Link href="/signup">
			<a className="da-button da-golden-btn" style={{ margin: "0 1em 1em 0" }}>Opprett gratis bruker</a>
		</Link>
		<Link href="/pricing">
			<a className="da-button da-button-subtle">Se priser</a>
		</Link>
	</>
)

const CTABtn = () => {
	const { user } = useCurrentUser()

	if (user) {
		return (
			<Link href="/calendars">
				<a className="da-button da-btn-large da-golden-btn">Gå til dine kalendere</a>
			</Link>
		)
	}
	return <AnonAction />
}


export const CTAButton = () => (
	<Suspense fallback={<AnonAction />}>
		<CTABtn />
	</Suspense>
)

export default CTAButton