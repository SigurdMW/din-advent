import React, { FC } from "react"
import classes from "./WhiteSection.module.scss"

export const WhiteSection: FC<{}> = ({ children }) => {
	return <div className={classes.whiteSection}>{children}</div>
}

export default WhiteSection