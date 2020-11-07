import React, { Suspense } from "react"
import { useQuery, useParam, BlitzPage } from "blitz"
import ShareLayout from "app/layouts/ShareLayout"
import getSharedCalendar from "app/shared/queries/getSharedCalendar"
import Calendar from "app/components/Calendar"
import Spinner from "app/components/Spinner"
import WhiteSection from "app/calendars/components/WhiteSection"

export const SharedCalendarRenderer = ({ sharedId }) => {
	const [calendar] = useQuery(getSharedCalendar, { sharedId })
	return (
		<WhiteSection>
			<Calendar calendar={calendar} isShare={true} />
		</WhiteSection>
	)
}

const SharedCalendarPage: BlitzPage = () => {
	const sharedId = useParam("sharedId", "string")
	if (!sharedId) return null
	return (
		<Suspense fallback={<Spinner />}>
			<SharedCalendarRenderer sharedId={sharedId} />
		</Suspense>
	)
}

SharedCalendarPage.getLayout = (page) => <ShareLayout title="Delt kalender - Din Advent">{page}</ShareLayout>

export default SharedCalendarPage
