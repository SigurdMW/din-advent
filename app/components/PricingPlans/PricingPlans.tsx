import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Plan } from "app/interfaces/Payment"
import { Link, useSession } from "blitz"
import React, { Suspense } from "react"
import classes from "./PricingPlans.module.scss"
import { pricePlanAndFeatures } from "app/price"
import { PricingItem } from "../PricingItem"

const LoginToBuy = ({ plan }: { plan: Plan }) => (
	<Link href={`/login?returnTo=${encodeURIComponent("/payments/new?plan=" + plan)}`}>
		<a>Logg inn for å kjøpe</a>
	</Link>
)

const ActionButton = ({ plan }: { plan: Plan }) => {
	const session = useSession()
	const { user } = useCurrentUser()
	if (session.isLoading || !session.userId) {
		return <LoginToBuy plan={plan} />
	}
	if (user?.plan && user.plan === plan) {
		return <span className={classes.yourPackage}>Du har denne pakken</span>
	}
	return (
		<Link href={`/payments/redirect?plan=${plan}`}>
			<a className={classes.buy}>Kjøp</a>
		</Link>
	)
}

export const PricingPlans = () => (
	<div className={`${classes.pricing} ${classes.pricingPalden}`}>
		{Object.values(pricePlanAndFeatures).map((item, i) => (
			<PricingItem key={i} item={item} featured={i === 1}>
				<Suspense fallback={<LoginToBuy plan={item.plan} />}>
					<ActionButton plan={item.plan} />
				</Suspense>
			</PricingItem>
		))}
	</div>
)

export default PricingPlans