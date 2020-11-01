import React, { Suspense } from "react"
import { useParam, BlitzPage, useQuery, Link } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"
import getWindow from "app/calendars/queries/getWindow"
// import Modal from "react-modal"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import CalendarWindow from "app/components/CalendarWindow"
import updateWindow from "app/calendars/mutations/updateWindow"
import { CalendarWindowUpdateInput } from "db"
import Spinner from "app/components/Spinner"
import getCalendarRoles from "app/calendars/queries/getCalendarRoles"

// Modal.setAppElement("#__next")

const GetWindow = ({ day, calendarId }) => {
	const [window, { mutate }] = useQuery(getWindow, { where: { calendarId, day } })
	const [calendarRoles] = useQuery(getCalendarRoles, { calendarId })
	const { user } = useCurrentUser()

	const allowedToEdit = calendarRoles.includes("admin") || calendarRoles.includes("editor")

	const saveWindow = async (v: CalendarWindowUpdateInput) => {
		const newWindow = await updateWindow({
			windowId: window.id,
			calendarId,
			day: window.day,
			data: v,
		})
		mutate(newWindow)
	}

	if (!user) return null
	return (
		<>
			<CalendarWindow calendarWindow={window} editorMode={allowedToEdit} save={saveWindow} />
			<Link href={`/calendars/${calendarId}`}>Tilbake til kalenderen</Link>
		</>
	)
}

const ShowWindowPage: BlitzPage = () => {
	const day = useParam("windowId", "number")
	const calendarId = useParam("calendarId", "number")

	if (!day || !calendarId) {
		return null
	}
	return (
		<Suspense fallback={<Spinner />}>
			<GetWindow day={day} calendarId={calendarId} />
		</Suspense>
	)
}

ShowWindowPage.getLayout = (page) => (
	<AuthLayout title="Kalenderluke - Din Advent">{page}</AuthLayout>
)

export default ShowWindowPage
