import Container from "app/components/Container"
import React from "react"
import classes from "./HowItWorks.module.scss"

const calendarIcon = (
	<svg width="64.551" height="71.723" viewBox="0 0 64.551 71.723">
		<path fill="#b97f24" d="M24.517,34.275H17.345v7.172h7.172Zm14.345,0H31.689v7.172h7.172Zm14.345,0H46.034v7.172h7.172Zm7.172-25.1H56.792V2H49.62V9.172H20.931V2H13.758V9.172H10.172a7.14,7.14,0,0,0-7.136,7.172L3,66.551a7.17,7.17,0,0,0,7.172,7.172H60.378a7.193,7.193,0,0,0,7.172-7.172V16.345A7.193,7.193,0,0,0,60.378,9.172Zm0,57.378H10.172V27.1H60.378Z" transform="translate(-3 -2)"/>
	</svg>
)

const plusIcon = (
	<svg width="64.914" height="64.914" viewBox="0 0 64.914 64.914">
		<path fill="#b97f24" d="M37.7,18.228H31.211V31.211H18.228V37.7H31.211V50.685H37.7V37.7H50.685V31.211H37.7ZM34.457,2A32.457,32.457,0,1,0,66.914,34.457,32.469,32.469,0,0,0,34.457,2Zm0,58.422A25.965,25.965,0,1,1,60.422,34.457,26,26,0,0,1,34.457,60.422Z" transform="translate(-2 -2)"/>
	</svg>
)

const mailIcon = (
	<svg width="71.723" height="57.378" viewBox="0 0 71.723 57.378">
		<path fill="#b97f24" d="M66.551,4H9.172a7.163,7.163,0,0,0-7.136,7.172L2,54.206a7.193,7.193,0,0,0,7.172,7.172H66.551a7.193,7.193,0,0,0,7.172-7.172V11.172A7.193,7.193,0,0,0,66.551,4Zm0,50.206H9.172V18.345L37.861,36.275,66.551,18.345ZM37.861,29.1,9.172,11.172H66.551Z" transform="translate(-2 -4)"/>
	</svg>
)

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