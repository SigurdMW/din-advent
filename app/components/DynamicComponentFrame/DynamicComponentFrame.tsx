import React from "react"
import classes from "./DynamicComponentFrame.module.scss"

const DynamicComponentFrame = ({ children, remove, editMode }) => {
	if (editMode) {
		return (
			<div className={classes.frame}>
				<div className={classes.content}>{children}</div>
				<button onClick={remove} className={classes.remove} title="Fjern denne innholdsseksjonen" aria-label="Fjern denne innholdsseksjonen">
					Fjern innhold
				</button>
			</div>
		)
	}
	return children
}

export default DynamicComponentFrame
