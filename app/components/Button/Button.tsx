import React, { FC, HTMLProps } from "react"

export interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, "size"> {
  type: "primary" | "secondary" | "subtle"
  size?: "large" | "small"
  className?: string
}

export const Button: FC<ButtonProps> = ({ children, type, size, className = "", ...rest }) => {
  let addedClassName = className ? className + " da-button" : "da-button"
  if (type === "primary") addedClassName += " da-golden-btn"
  if (type === "secondary") addedClassName += " da-btn-white"
  if (type === "subtle") addedClassName += " da-button-subtle"
  if (size === "large") addedClassName += " da-btn-large"
  return (
    <button className={addedClassName} {...rest}>
      {children}
    </button>
  )
}

export default Button
