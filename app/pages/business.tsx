import { BlitzPage } from "blitz"
import React from "react"
import classes from "./index.module.scss"
import LandingSection from "app/components/FrontPage/LandingSection"
import FullWidthLayout from "app/layouts/FullWidthLayout"
import HowItWorks from "app/components/FrontPage/HowItWorks"
import CTAButton from "app/components/FrontPage/CTAButton"
import PriceSection from "app/components/FrontPage/PriceSection"
import CollaborateSection from "app/components/FrontPage/CollaborateSection"
import { WorkItem } from "app/components/FrontPage/HowItWorks/HowItWorks"
import { calendarIcon, mailIcon, plusIcon } from "app/components/icons"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const items: WorkItem[] = [
	{
		icon: calendarIcon,
		title: "Lag en kalender for teamet",
		text: <p>Overask dine kolleger ved å lage en digital julekalender! En kalender kan skape samhold og være et samlende tiltak i en krevende tid.</p>
	},
	{
		icon: plusIcon,
		title: "Samarbeid om innhold",
		text: <p>Dere velger selv hva kalenderen skal inneholde, og om det er en som skal fylle alle luker eller om dere skal samarbeide om det. Vi anbefaler samarbeid - det gjør kalenderen deres mer spennende.</p>
	},
	{
		icon: mailIcon,
		title: "Del kalenderen",
		text: <p>Skap et samlingspunkt rundt kalenderen ved å åpne lukene sammen. Slik får alle får glede av innholdet dere har laget!</p>
	}
]

const BusinessPage: BlitzPage = () => (
	<>
		<LandingSection
			toList={["teamet ditt", "en kollega", "medarbeiderne dine", "en kunde", "en du samarbeider med"]}
		>
			<p>Med Din Advent kan du skape engasjement på arbeidsplassen i adventstiden. Lag en kalender til teamet ditt eller samarbeid med teamet ditt om å lage den perfekte julekalenderen for akkurat dere!</p>
		</LandingSection>
		<HowItWorks items={items} />
		<CollaborateSection />
		<PriceSection />

		<div className={classes.smallSection}>
			<div>
				<p>Klar til å sette i gang?</p>
				<CTAButton />
			</div>
		</div>
	</>
)

BusinessPage.getLayout = (page) => <FullWidthLayout title="Forside - Din Advent">{page}</FullWidthLayout>

export default BusinessPage
