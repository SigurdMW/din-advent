import React from "react"
import classes from "./DynamicComponentFrame.module.scss"

const DynamicComponentFrame = ({ children, remove, editMode }) => {
	if (editMode) {
		return (
			<div className={classes.frame}>
				<button onClick={remove} className={classes.remove} title="Fjern deenne innholdsseksjonen" aria-label="Fjern deenne innholdsseksjonen">
          X
				</button>
				{children}
			</div>
		)
	}
	return children
}

export default DynamicComponentFrame
