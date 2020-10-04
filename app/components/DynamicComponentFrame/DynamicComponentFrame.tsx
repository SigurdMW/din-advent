import React from "react"
import classes from "./DynamicComponentFrame.module.scss"

const DynamicComponentFrame = ({ children, remove, editMode }) => {
  if (editMode) {
    return (
      <div className={classes.frame}>
        <button onClick={remove} className={classes.remove}>
          X
        </button>
        {children}
      </div>
    )
  }
  return children
}

export default DynamicComponentFrame
