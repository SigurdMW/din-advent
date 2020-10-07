import React, { FC, ReactNode } from "react"
import Modal from "react-modal"
import classes from "./Modal.module.scss"

Modal.setAppElement("#__next")

interface CustomModalProps {
  isOpen: boolean
  requestClose: () => void
  label: string
  header?: ReactNode
  footer?: ReactNode
  /**
   * @default true
   */
  showClose?: boolean
}

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  content: {
    top: "200px",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "600px",
    minWidth: "300px",
  },
}

export const CustomModal: FC<CustomModalProps> = ({
  children,
  isOpen,
  requestClose,
  label,
  header,
  footer,
  showClose = true,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={requestClose} contentLabel={label} style={customStyles}>
      <div className={classes.body}>
        <div className={classes.header}>
          {header && header}
          {showClose && (
            <button onClick={requestClose} className={classes.close}>
              X
            </button>
          )}
        </div>
        <div className={classes.content}>{children}</div>
        <div className={classes.footer}>{footer && footer}</div>
      </div>
    </Modal>
  )
}

export default CustomModal
