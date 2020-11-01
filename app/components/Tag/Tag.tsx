import { FC } from "react"
import classes from "./Tag.module.scss"

export const Tag: FC<{ onRemove?: any, ariaLabel?: string }> = ({ children, onRemove, ariaLabel }) => {
	return (
		<div className={classes.tag}>
			{children}
			{onRemove && <button onClick={onRemove} aria-label={ariaLabel} type="button">x</button>}
		</div>
	)
}

export default Tag