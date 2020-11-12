import HeroBanner from "app/components/HeroBanner"
import React, { useEffect, useRef } from "react"
import CTAButton from "../CTAButton"
import classes from "./LandingSection.module.scss"
import Typed from "typed.js"

const toList = [
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
]

export const LandingSection = () => {
	const ref = useRef(null)

	useEffect(() => {
		let typedInst;
		if (ref && ref.current) {
			typedInst = new Typed(ref.current as any, {
				strings: toList,
				typeSpeed: 120,
				backSpeed: 100,
				backDelay: 2500,
				loop: true
			})
		}
		return () => {
			if (typedInst) typedInst.destroy()
		}
	}, [ref])

	return (
		<HeroBanner type="wide">
			<div className={classes.heroContent}>
				<div className={classes.heroImage}>
					<img src="promo-lossy-2x.png" alt="stearinlys og julestemning" />
				</div>
				<div className={classes.heroText}>
					<div className="hero-text">
						<h1>Gi en digital julekalender til <span ref={ref}></span></h1>
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