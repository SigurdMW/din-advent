import React, { FC } from "react"
import classes from "./Container.module.scss"

export const Container: FC<{className?: string}> = ({ children, className = "" }) => (
	<div className={`${classes.container} ${className}`}>{children}</div>
)

export default Container