import React, { ReactNode, useState } from "react"
import Button from "app/components/Button"
import shareCalendarByKey from "app/calendars/mutations/shareCalendarByKey"
import Modal from "app/components/Modal"
import { Alert } from "app/components/Alert"

export const ShareByLinkSection = ({ calendarId, onShared }) => {
	const [isCreatingShareKey, setIsCreatingShareKey] = useState(false)
	const [shareError, setShareError] = useState<null | ReactNode>(null)
	const [isOpen, setIsOpen] = useState(false)

	const share = async () => {
		try {
			setShareError(null)
			setIsCreatingShareKey(true)
			await shareCalendarByKey({ calendarId })
			if (onShared) await onShared()
			setIsOpen(false)
		} catch (e) {
			setShareError(e && e.message ? e.message : "Noe gikk galt :/")
		} finally {
			setIsCreatingShareKey(false)
		}
	}

	return (
		<>
			<Button type="subtle" onClick={() => setIsOpen(true)}>
        Del med link
			</Button>
			<Modal isOpen={isOpen} requestClose={() => setIsOpen(false)} label="Del med e-post">
				<div style={{ marginBottom: "1em" }}>
					<h2>Del med link</h2>
					<p>
            Når du deler med link, blir kalenderen og alt innhold tilgjengelig for de som har
            linken. Du kan når som helst slette linken for å fjerne delingen.
					</p>
					<Button onClick={share} type="primary" disabled={isCreatingShareKey || !!shareError}>
            Opprett delingslink
					</Button>
				</div>
				{shareError && 
					<Alert type="danger">{shareError}</Alert>
				}
			</Modal>
		</>
	)
}

export default ShareByLinkSection
