import Layout from "app/layouts/Layout"
import classes from "./pricing.module.scss"
import React from "react"
import PricingPlans from "app/components/PricingPlans"

export const PricingPage = () => (
	<div className={classes.container}>
		<h1 style={{ textAlign: "center" }}>Priser</h1>
		<p>
      Det er gratis å opprette bruker. Du kan også opprette kalendere uten å betale, men dersom du
      vil dele kalenderen du har laget med noen må du kjøpe en av følgende produkter:
		</p>
		<PricingPlans />
	</div>
)

PricingPage.getLayout = (page) => <Layout title="Priser - Din Advent">{page}</Layout>

export default PricingPage
