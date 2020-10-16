import React, { FC } from "react"
import classes from "./Spinner.module.scss"

// Thanks to https://codepen.io/woodwoerk/pen/XXJoMa

export const Spinner: FC<{}> = () => {
  return (
    <div className={classes.container}>
      <div className={classes.candy}>
        <div className={classes.candyLoader}></div>
      </div>
    </div>
  )
}

export default Spinner
