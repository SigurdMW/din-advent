import React, { FC, ReactNode } from "react"
import classes from "./ShareItem.module.scss"

const ShareItem: FC<{ actions?: ReactNode }> = ({ children, actions }) => {
  return (
    <li className={classes.item}>
      <div className={classes.itemContent}>{children}</div>
      {actions && actions}
    </li>
  )
}

export default ShareItem
