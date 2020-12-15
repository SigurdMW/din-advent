import React, { Suspense } from "react"
import { useParam, BlitzPage, useQuery, Link, Router, useMutation } from "blitz"
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
import { usePreviewState } from "app/utils/usePreviewState"

// Modal.setAppElement("#__next")

const JumpToWindow = ({calendarId, day}) => {
	const jumpTo = (new Array(24).fill(0)).map((c,i) => i + 1)
	return (
		<>
			<label htmlFor="gotocalendarwindow">Hopp til en annen luke</label>
			<select
				id="gotocalendarwindow"
				onChange={(v) => window.location.href = `/calendars/${calendarId}/${v.target.value}`} // TODO: fix this to use JS navigation but make sure RichText editor updates content accordingly
				style={{ maxWidth: "240px", marginBottom: "1em" }}
			>
				<option>Gå til luke...</option>
				{jumpTo.filter((d) => d !== day).map((d) => <option key={d} value={d}>{d}</option>)}
			</select>
		</>
	)
}

const GetWindow = ({ day, calendarId }: {day: number, calendarId: number}) => {
	const [window, { setQueryData }] = useQuery(getWindow, { where: { calendarId, day } })
	const [calendarRoles] = useQuery(getCalendarRoles, { calendarId })
	const { user } = useCurrentUser()
	const [updateWindowMutation] = useMutation(updateWindow)
	
	const allowedToEdit = calendarRoles.includes("admin") || calendarRoles.includes("editor") || calendarRoles.includes("editor/" + day as any)
	const isReader = calendarRoles.includes("reader")
	const isReaderOnly = isReader && calendarRoles.length === 1
	const allowedToView = allowedToViewCalendarWindow(day)
	
	const defaultPreviewState = isReaderOnly ? true : isReader ? allowedToView : false

	const [previewMode, setPreviewMode] = usePreviewState(calendarId,  defaultPreviewState)

	const saveWindow = async (v: CalendarWindowUpdateInput) => {
		const newWindow = await updateWindowMutation({
			windowId: window.id,
			calendarId,
			day: window.day,
			data: v,
		})
		setQueryData(newWindow)
	}

	if (!user) return null
	if (!allowedToEdit) {
		if (!allowedToView) return <NotAllowedView day={day} /> 
	}

	return (
		<>
			<CalendarWindow calendarWindow={window} editorMode={!previewMode} save={saveWindow} />
			{allowedToEdit && <PreviewEditFab preview={previewMode} onChange={setPreviewMode} />}
			{!previewMode && 
				<JumpToWindow calendarId={calendarId} day={day} />
			}
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
