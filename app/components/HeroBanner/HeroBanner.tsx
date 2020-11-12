import React, { FC } from "react"
import Container from "../Container"
import classes from "./HeroBanner.module.scss"

export const HeroBanner: FC<{ type?: "wide" | "normal" }> = ({ children, type = "normal" }) => {
	return (
		<div className={classes.hero}>
			<Container className={type === "wide" ? classes.wideContainer : ""}>
				{children}
			</Container>
		</div>
	)
}

export default HeroBanner