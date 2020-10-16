import React, { FC, ReactNode } from "react"
import classes from "./Toggle.module.scss"

export interface ToggleProps {
  checked: boolean
  leftLabel?: string | ReactNode
  label: string | ReactNode
  id: string
  onChange: (val: boolean) => void
}

export const Toggle: FC<ToggleProps> = ({ id, label, leftLabel, checked, onChange }) => {
  return (
    <label className={classes.label}>
      {leftLabel && leftLabel}
      <input
        id={id}
        checked={checked}
        type="checkbox"
        className={classes.toggle}
        onChange={() => onChange(!checked)}
      />
      {label}
    </label>
  )
}

export default Toggle
