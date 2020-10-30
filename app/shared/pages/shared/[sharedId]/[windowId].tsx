import React, { Suspense } from "react"
import { useParam, BlitzPage, useQuery } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"
import CalendarWindow from "app/components/CalendarWindow"
import getSharedCalendarWindow from "app/shared/queries/getSharedCalendarWindow"
import NotAllowedView from "app/components/NotAllowedView"
import Spinner from "app/components/Spinner"
import { allowedToViewCalendarWindow } from "app/utils/allowedToViewCalendarWindow"

const GetWindow = ({ day, sharedId }) => {
	const [window] = useQuery(getSharedCalendarWindow, { day, sharedId })
	return <CalendarWindow calendarWindow={window} editorMode={false} />
}

const ShowWindowPage: BlitzPage = () => {
	const day = useParam("windowId", "number")
	const sharedId = useParam("sharedId", "string")
	const allowedToView = allowedToViewCalendarWindow(day)

	if (!day || !sharedId) {
		return null
	}

	if (!allowedToView) {
		return <NotAllowedView day={day} />
	}
	return (
		<Suspense fallback={<Spinner />}>
			<GetWindow day={day} sharedId={sharedId} />
		</Suspense>
	)
}

ShowWindowPage.getLayout = (page) => (
	<AuthLayout title="Kalenderluke - Din Advent">{page}</AuthLayout>
)

export default ShowWindowPage
