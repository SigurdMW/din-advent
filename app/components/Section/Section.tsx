import React, { FC } from "react"
import classes from "./Section.module.scss"

export const Section: FC<{}> = ({ children }) => (
	<div className={classes.section}>{children}</div>
)

export default Section