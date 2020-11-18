import Container from "app/components/Container"
import React from "react"
import classes from "./CollaborateSection.module.scss"

const CollaborateSection = () => {
	return (
		<Container className={classes.section}>
			<h2>Samarbeid</h2>
			<img src="/samarbeid.png" alt="Ny samarbeidsfunksjonaltet på dinadvent.no" />
		</Container>
	)
}

export default CollaborateSection