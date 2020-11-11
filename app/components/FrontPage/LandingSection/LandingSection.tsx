import HeroBanner from "app/components/HeroBanner"
import React from "react"
import CTAButton from "../CTAButton"
import classes from "./LandingSection.module.scss"

export const LandingSection = () => {
	return (
		<HeroBanner>
			<div className={classes.heroContent}>
				<div className={classes.heroImage}>
					<img src="promo-lossy-2x.png" alt="stearinlys og julestemning" />
				</div>
				<div className={classes.heroText}>
					<div className="hero-text">
						<h1>Gi en digital julekalender til noen du er glad i</h1>
						<p>Med Din Advent kan du gi noen du bryr deg om en spennende adventstid. Opprett gratis bruker i dag for å komme i gang! Skulle du like tjenesten, kan du se hvilken pakke som passer deg.</p>
						<div className="hero-actions">
							<CTAButton />
						</div>
					</div>
				</div>
			</div>
		</HeroBanner>
	)
}

export default LandingSection