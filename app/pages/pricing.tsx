import Layout from "app/layouts/Layout"
import classes from "./pricing.module.scss"
import { pricePlanAndFeatures } from "app/price"
import { Plan } from "app/interfaces/Payment"
import React, { Suspense } from "react"
import { Link, useSession } from "blitz"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { PricingItem } from "app/components/PricingItem"

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

export const PricingPage = () => (
  <div className={classes.container}>
    <h1 style={{ textAlign: "center" }}>Priser</h1>
    <p>
      Det er gratis å opprette bruker. Du kan også opprette kalendere uten å betale, men dersom du
      vil dele kalenderen du har laget med noen må du kjøpe en av følgende produkter:
    </p>
    <div className={`${classes.pricing} ${classes.pricingPalden}`}>
      {Object.values(pricePlanAndFeatures).map((item, i) => (
        <PricingItem key={i} item={item} featured={i === 1}>
          <Suspense fallback={<LoginToBuy plan={item.plan} />}>
            <ActionButton plan={item.plan} />
          </Suspense>
        </PricingItem>
      ))}
    </div>
  </div>
)

PricingPage.getLayout = (page) => <Layout title="Priser - Din Advent">{page}</Layout>

export default PricingPage
