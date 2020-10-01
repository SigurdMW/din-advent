import React from "react"
import classes from "./DynamicComponentFrame.module.scss"

const DynamicComponentFrame = ({ children, remove }) => {
  return (
    <div className={classes.frame}>
      <button onClick={remove} className={classes.remove}>
        x
      </button>
      {children}
    </div>
  )
}

export default DynamicComponentFrame
