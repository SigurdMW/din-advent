import React, { FC } from "react"
import classes from "./Spinner.module.scss"

// Thanks to https://projects.lukehaas.me/css-loaders/
// More xmasy https://codepen.io/woodwoerk/pen/XXJoMa

export const Spinner: FC<{}> = ({ children }) => {
	if (!children) return <div className={classes.loader}>Loading...</div>
	return (
		<div className={classes.container}>
			<div className={classes.loader}>Loading...</div>
			{children}
		</div>
	)
}

export default Spinner
