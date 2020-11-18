import HeroBanner from "app/components/HeroBanner"
import React, { FC, ReactNode, useEffect, useRef } from "react"
import CTAButton from "../CTAButton"
import classes from "./LandingSection.module.scss"
import Typed from "typed.js"

export const LandingSection: FC<{ toList: string[] }> = ({ toList, children }) => {
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
						{children}
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