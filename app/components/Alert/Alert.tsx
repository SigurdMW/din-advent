import React, { FC } from "react"
import classes from "./Alert.module.scss"

interface AlertProps {
  type: "success" | "info" | "warning" | "danger"
}

export const Alert: FC<AlertProps> = ({ type, children }) => (
	<div className={`${classes.alert} ${classes[type]}`}>{children}</div>
)

export default Alert
