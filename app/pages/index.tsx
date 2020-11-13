import { BlitzPage } from "blitz"
import React from "react"
import classes from "./index.module.scss"
import LandingSection from "app/components/FrontPage/LandingSection"
import FullWidthLayout from "app/layouts/FullWidthLayout"
import CTAButton from "app/components/FrontPage/CTAButton"
import PriceSection from "app/components/FrontPage/PriceSection"
import { calendarIcon, mailIcon, plusIcon } from "app/components/icons"
import HowItWorks, { WorkItem } from "app/components/FrontPage/HowItWorks/HowItWorks"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const items: WorkItem[] = [
	{
		icon: calendarIcon,
		title: "Opprett en kalender",
		text: <p>Overask noen du er glad i med en personlig digital adventskalender. Du kan lage en kalender til hvem som helst. Det kan være ektefelle, venn, en i familien eller barn.</p>
	},
	{
		icon: plusIcon,
		title: "Legg til innhold",
		text: <p>Du velger selv hva kalenderen skal inneholde. Det kan være: overraskelser, vitser, gåter, oppgaver eller minner. Vi har et intuitivt grensesnitt som støtter bilder, tekst, linker, videoer og mye mer.</p>
	},
	{
		icon: mailIcon,
		title: "Del kalender",
		text: <p>Du kan når som helst dele kalenderen ved hjelp av en e-post eller delingslink som blir tilgjengelig etter betaling. Denne linken kan du dele med en eller flere personer.</p>
	}
]

const Home: BlitzPage = () => (
	<>
		<LandingSection 
			toList={[
				"bestevennen din",
				"samboeren",
				"kona",
				"ektemannen",
				"en god kollega",
				"mamma",
				"pappa",
				"sønnen din",
				"datteren din",
				"noen du er glad i"
			]}
		>
			<p>Med Din Advent kan du gi noen du bryr deg om en spennende adventstid. Opprett gratis bruker i dag for å komme i gang! Skulle du like tjenesten, kan du se hvilken pakke som passer deg.</p>
		</LandingSection>
		<HowItWorks items={items} />
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
