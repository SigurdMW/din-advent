import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Link } from "blitz"
import React, { Suspense } from "react"
import Button from "../Button"

const AnonAction = () => (
	<>
		<Link href="/signup" passHref>
			<Button type="green" anchor={true} style={{ margin: "0 1em 1em 0" }}>Kom i gang</Button>
		</Link>
		<Link href="/pricing">
			<a>Se priser</a>
		</Link>
	</>
)

const CTABtn = () => {
	const { user } = useCurrentUser()

	if (user) {
		return (
			<Link href="/calendars" passHref>
				<Button type="green" anchor={true} style={{ margin: "0 1em 1em 0" }}>Gå til dine kalendere</Button>
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