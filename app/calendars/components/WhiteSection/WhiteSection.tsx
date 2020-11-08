import React, { FC, HTMLAttributes } from "react"
import classes from "./WhiteSection.module.scss"

export const WhiteSection: FC<Pick<HTMLAttributes<HTMLDivElement>, "style" | "className">> = ({ children, style, className }) => {
	return <div className={`${classes.whiteSection} ${className || ""}`} style={style}>{children}</div>
}

export default WhiteSection