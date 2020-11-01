import Button from "app/components/Button"
import Modal from "app/components/Modal"
import React, { FC, useState } from "react"
import InviteCollaborateForm from "./InviteCollaborateForm"

interface InviteCollaborateSectionProps {
  calendarId: number
  onShared: () => Promise<any>
}

export const InviteCollaborateSection: FC<InviteCollaborateSectionProps> = ({ calendarId, onShared }) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<>
			<Button type="primary" onClick={() => setIsOpen(true)}>
        		Legg til med e-post
			</Button>
			<Modal isOpen={isOpen} requestClose={() => setIsOpen(false)} label="Del med e-post">
				<InviteCollaborateForm calendarId={calendarId} onShared={onShared} />
			</Modal>
		</>
	)
}

export default InviteCollaborateSection
