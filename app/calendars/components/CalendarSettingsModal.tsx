import React, { Suspense } from "react"
import { useRouter } from "blitz"
import deleteCalendar from "app/calendars/mutations/deleteCalendar"
import Button from "app/components/Button"
import Modal from "app/components/Modal"
import Spinner from "app/components/Spinner"
import CalendarBackgroundSection from "./CalendarBackgroundSection"
import ChangeNameForm from "./ChangeNameForm"

const CalendarSettingsModal = ({ calendarId, isOpen = false, onClose }) => {
	const router = useRouter()

	const handleDeleteCalendar = async () => {
		if (
			window.confirm(
				"Kalenderen og alt tilhørende innhold vil bli slettet. Handlingen kan ikke angres. Vil du fortsette?"
			)
		) {
			await deleteCalendar({ where: { id: calendarId } })
			router.push("/calendars")
		}
	}

	if (!calendarId) return null
	return (
		<Suspense fallback={<Spinner />}>
			<Modal
				isOpen={isOpen}
				requestClose={onClose}
				label="Innstillinger"
				header={<h2>Innstillinger</h2>}
			>
				<ChangeNameForm calendarId={calendarId} />
				<hr className="da-divider da-divider--white-bg" />
				<CalendarBackgroundSection calendarId={calendarId} />
				<hr className="da-divider da-divider--white-bg" />
				<Button type="red" onClick={handleDeleteCalendar}>
        			Slett kalender
				</Button>
			</Modal>
		</Suspense>
	)
}

export default CalendarSettingsModal
