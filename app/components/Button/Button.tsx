import React, { FC, HTMLProps } from "react"
import classes from "./Button.module.scss"

export interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, "size"> {
  type: "primary" | "secondary" | "subtle" | "green" | "purple" | "red"
  size?: "large" | "small"
  className?: string
  buttonType?: "button" | "submit"
  anchor?: boolean
}

export const Button: FC<ButtonProps> = ({ children, type, size, buttonType = "button", className = "", anchor = false, ...rest }) => {
	let addedClassName = `${classes.button} ${className}`
	if (type === "primary") addedClassName += " " + classes.primary
	if (type === "secondary") addedClassName += " " + classes.secondary
	if (type === "subtle") addedClassName += " " + classes.subtle
	if (type === "green") addedClassName += " " + classes.green
	if (type === "purple") addedClassName += " " + classes.purple
	if (type === "red") addedClassName += " " + classes.red
	
	if (size === "large") addedClassName += " " + classes.large
	
	if (anchor) {
		return <a className={addedClassName} {...(rest as any)}>
			{children}
		</a>
	}
	return (
		<button className={addedClassName} type={buttonType} {...rest}>
			{children}
		</button>
	)
}

export default Button
