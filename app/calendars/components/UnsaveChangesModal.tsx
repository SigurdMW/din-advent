// import { Router } from "blitz"
import React from "react"
import Modal from "react-modal"

// TODO: Implement Waning when navigation away from the page with unsaved changes

const UnsavedChangesModal = ({ isOpen, onClose }) => {
  // Router.events.on("beforeHistoryChange", (e) => {
  // 	return false
  // })
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
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Example Modal">
      <p>Du har endringer som ikke er lagret</p>
    </Modal>
  )
}

export default UnsavedChangesModal
