import WhiteSection from "app/calendars/components/WhiteSection"
import Container from "app/components/Container"
import React from "react"
import classes from "./CollaborateSection.module.scss"

const CollaborateSection = () => {
	return (
		<WhiteSection>
			<Container className={classes.colabContainer}>
				<div className={classes.left}>
					
					<h2><div className={classes.new}>Nyhet!</div> Jobb mer effektivt sammen</h2>
					<p>Vi har gjort det enkelt for flere personer å samarbeide på én og samme kalender. Denne funksjonen er ny i år og er perfekt for større familier eller bedrifter hvor det er flere personer involvert i å lage innhold til kalenderen. </p>
				</div>
				<div className={classes.right}>
					<img src="/samarbeid.svg" style={{ width: "100%", height: "auto" }} alt="Nyhet! Samarbeid med andre om en kalender." /> 
				</div>
			</Container>
		</WhiteSection>
	)
}

export default CollaborateSection