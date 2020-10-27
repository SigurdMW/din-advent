import { Router } from "blitz"
import React, { FC, useEffect, useState } from "react"
import Modal from "react-modal"

// var isDirty = function() { return false; }

// window.onload = function() {
// 	window.addEventListener("beforeunload", function (e) {
// 		if (formSubmitting || !isDirty()) {
// 			return undefined;
// 		}

// 		var confirmationMessage = 'It looks like you have been editing something. '
// 								+ 'If you leave before saving, your changes will be lost.';

// 		(e || window.event).returnValue = confirmationMessage; //Gecko + IE
// 		return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
// 	});
// };

interface BlockNavigationProps {
  shouldBlock: boolean
  onNavigationAttempt?: () => void
}

const BlockNavigation: FC<BlockNavigationProps> = ({
  shouldBlock,
  onNavigationAttempt,
  children,
}) => {
  const [, setUrl] = useState<string | null>(null)
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (shouldBlock) {
        setUrl(url)
        if (onNavigationAttempt) onNavigationAttempt()
        throw new Error("Please confim")
      }
    }
    Router.events.on("routeChangeStart", handleRouteChange)
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldBlock])
  if (shouldBlock && children) return <>{children}</>
  return null
}

const UnsavedChangesModal = ({ isDirty, save, discard }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onDiscard = () => {
    discard()
    setIsOpen(false)
  }
  const onSave = () => {
    save()
    setIsOpen(false)
  }
  return (
    <BlockNavigation shouldBlock={isDirty} onNavigationAttempt={() => setIsOpen(true)}>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} contentLabel="Example Modal">
        <p>Du har endringer som ikke er lagret</p>
        <button onClick={onSave}>Lagre endringer</button>
        <button onClick={onDiscard}>Forkast endringer</button>
      </Modal>
    </BlockNavigation>
  )
}

export default UnsavedChangesModal
