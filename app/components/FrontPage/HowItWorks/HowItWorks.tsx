import Container from "app/components/Container"
import { calendarIcon, mailIcon, plusIcon } from "app/components/icons"
import React from "react"
import classes from "./HowItWorks.module.scss"

const items = [
	{
		icon: calendarIcon,
		title: "Opprett en kalender",
		text: "Overask noen du er glad i med en personlig digital adventskalender. Du kan lage en kalender til hvem som helst. Det kan være ektefelle, venn, en i familien eller barn."
	},
	{
		icon: plusIcon,
		title: "Legg til innhold",
		text: "Du velger selv hva kalenderen skal inneholde. Det kan være: overraskelser, vitser, gåter, oppgaver eller minner. Vi har et intuitivt grensesnitt som støtter bilder, tekst, linker, videoer og mye mer."
	},
	{
		icon: mailIcon,
		title: "Del kalender",
		text: "Du kan når som helst dele kalenderen ved hjelp av en e-post eller delingslink som blir tilgjengelig etter betaling. Denne linken kan du dele med en eller flere personer."
	}
]

const WorksItem = ({ icon, title, text }) => (
	<div className={classes.col}>
		<>{icon}</>
		<h3 className={classes.subTitle}>{title}</h3>
		<p>{text}</p>
	</div>
)

export const HowItWorks = () => (
	<div className={classes.section}>
		<Container>
			<h2>Hvordan fungerer det?</h2>
			<div className={classes.row}>
				{items.map((item) => <WorksItem key={item.title} {...item} />)}
			</div>
		</Container>
	</div>
)

export default HowItWorks