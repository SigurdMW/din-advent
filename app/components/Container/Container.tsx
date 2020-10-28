import React, { FC } from "react"
import classes from "./Container.module.scss"

export const Container: FC<{}> = ({ children }) => (
	<div className={classes.container}>{children}</div>
)

export default Container