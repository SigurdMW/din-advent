import { BlitzPage } from "blitz"
import React from "react"
import classes from "./index.module.scss"
import LandingSection from "app/components/FrontPage/LandingSection"
import FullWidthLayout from "app/layouts/FullWidthLayout"
import HowItWorks from "app/components/FrontPage/HowItWorks"
import CTAButton from "app/components/FrontPage/CTAButton"
import PriceSection from "app/components/FrontPage/PriceSection"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => (
	<>
		<LandingSection />
		<HowItWorks />
		<PriceSection />

		<div className={classes.smallSection}>
			<div>
				<p>Klar til å sette i gang?</p>
				<CTAButton />
			</div>
		</div>
	</>
)

Home.getLayout = (page) => <FullWidthLayout title="Forside - Din Advent">{page}</FullWidthLayout>

export default Home
