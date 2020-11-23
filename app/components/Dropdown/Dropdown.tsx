import { FC, ReactNode, useRef, useState } from "react"
import useClickOutside from "../utils/useClickOutside"
import classes from "./Dropdown.module.scss"

export const Dropdown: FC<{ triggerContent: ReactNode, id: string, className?: string }> = ({
	children,
	triggerContent,
	id,
	className = ""
}) => {
	const buttonEl = useRef(null)
	const dropdownEl = useRef(null)
	const [isOpen, setIsOpen] = useState(false)

	useClickOutside(dropdownEl, () => {
		if (isOpen) {
			setIsOpen(false)
		}
	})

	const buttonId = id + "-button"
	const dropdownId = id + "-dropdown"

	return (
		<div className={`${classes.container} ${className}`} onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				ref={buttonEl}
				id={buttonId}
				className={classes.button}
				aria-controls={dropdownId}
				aria-expanded={isOpen}
			>
				{triggerContent}
			</button>

			<div
				ref={dropdownEl}
				id={dropdownId}
				className={`${classes.dropdown} ${isOpen ? "" : classes.closed}`}
				onClick={() => setIsOpen(false)}
				aria-hidden={!isOpen}
			>
				{children}
				<div className={classes.arrow}></div>
			</div>
		</div>
	)
}

export default Dropdown
