import React, { FC } from "react"
import classes from "./Spinner.module.scss"

// Thanks to https://projects.lukehaas.me/css-loaders/
// More xmasy https://codepen.io/woodwoerk/pen/XXJoMa

export const Spinner: FC<{}> = () => {
  //   return (
  //     <div className={classes.container}>
  //       <div className={classes.candy}>
  //         <div className={classes.candyLoader}></div>
  //       </div>
  //     </div>
  //   )
  return <div className={classes.loader}>Loading...</div>
}

export default Spinner
