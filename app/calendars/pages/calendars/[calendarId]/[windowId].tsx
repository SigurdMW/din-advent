import React, { Suspense, useState } from "react"
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
import { allowedToViewCalendarWindow } from "app/utils/allowedToViewCalendarWindow"
import NotAllowedView from "app/components/NotAllowedView"
import PreviewEditFab from "app/calendars/components/PreviewEditFab"

// Modal.setAppElement("#__next")

const GetWindow = ({ day, calendarId }) => {
	const [window, { mutate }] = useQuery(getWindow, { where: { calendarId, day } })
	const [calendarRoles] = useQuery(getCalendarRoles, { calendarId })
	const { user } = useCurrentUser()
	
	const allowedToEdit = calendarRoles.includes("admin") || calendarRoles.includes("editor") || calendarRoles.includes("editor/" + day as any)
	const [previewMode, setPreviewMode] = useState(allowedToEdit)

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
	if (!allowedToEdit) {
		const allowedToView = allowedToViewCalendarWindow(day)
		if (!allowedToView) return <NotAllowedView day={day} /> 
	}

	return (
		<>
			<CalendarWindow calendarWindow={window} editorMode={previewMode} save={saveWindow} />
			{allowedToEdit && <PreviewEditFab defaultPreview={previewMode} onChange={(val) => setPreviewMode(val)} />}
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
