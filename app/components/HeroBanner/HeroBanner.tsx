import React, { FC } from "react"
import Container from "../Container"
import classes from "./HeroBanner.module.scss"

export const HeroBanner: FC<{}> = ({ children }) => {
	return (
		<div className={classes.hero}>
			<Container>
				{children}
			</Container>
		</div>
	)
}

export default HeroBanner