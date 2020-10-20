import { FC, ReactNode, useRef, useState } from "react"
import classes from "./ProfileDropdown.module.scss"
import useClickOutside from "./useClickOutside"

export const ProfileDropdown: FC<{ triggerContent: ReactNode }> = ({
  children,
  triggerContent,
}) => {
  const buttonEl = useRef(null)
  const dropdownEl = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  useClickOutside(dropdownEl, () => {
    if (isOpen) {
      setIsOpen(false)
    }
  })

  return (
    <div className={classes.container} onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        ref={buttonEl}
        id="profilebutton"
        className={classes.button}
      >
        {triggerContent}
      </button>

      <div
        ref={dropdownEl}
        id="profiledropdown"
        className={`${classes.dropdown} ${isOpen ? "" : classes.closed}`}
        onClick={() => setIsOpen(false)}
      >
        {children}
        <div className={classes.arrow}></div>
      </div>
    </div>
  )
}

export default ProfileDropdown
