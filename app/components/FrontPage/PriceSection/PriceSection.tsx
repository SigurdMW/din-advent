import Container from "app/components/Container"
import PricingPlans from "app/components/PricingPlans"
import Section from "app/components/Section"
import React from "react"

export const PriceSection = () => (
	<Container>
		<Section>
			<h2>Priser</h2>
			<p style={{maxWidth: "571px"}}>Betal med en gang eller vent til kalenderen er ferdig og du er klar for å betale, vi liker fleksibilitet.</p>
			<PricingPlans />
		</Section>
	</Container>
)

export default PriceSection