import React, { FC, HTMLAttributes } from "react"
import classes from "./FAB.module.scss"

export const FAB: FC<HTMLAttributes<HTMLButtonElement>> = ({ onClick, style, title, children, ...rest }) => (
	<div className={classes.fab} style={style}>
		<button onClick={onClick} title={title} {...rest}>{children}</button>
	</div>
)

export default FAB