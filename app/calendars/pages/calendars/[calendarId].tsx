import React, { Suspense } from "react"
import { useParam, BlitzPage} from "blitz"
import Spinner from "app/components/Spinner"
import FullWidthLayout from "app/layouts/FullWidthLayout"
import CalendarRenderer from "app/calendars/components/CalendarRenderer"

const ShowCalendarPage: BlitzPage = () => {
	const calendarId = useParam("calendarId", "number")
	if (!calendarId) return null
	return (
		<Suspense fallback={<Spinner />}>
			<CalendarRenderer calendarId={calendarId} />
		</Suspense>
	)
}

ShowCalendarPage.getLayout = (page) => <FullWidthLayout title="Kalender - Din Advent">{page}</FullWidthLayout>

export default ShowCalendarPage
