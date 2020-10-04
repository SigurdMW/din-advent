import React, { Suspense } from "react"
import { useParam, BlitzPage, useQuery } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"
import CalendarWindow from "app/components/CalendarWindow"
import getSharedCalendarWindow from "app/shared/queries/getSharedCalendarWindow"

const GetWindow = ({ day, sharedId }) => {
  const [window] = useQuery(getSharedCalendarWindow, { day, sharedId })
  return <CalendarWindow calendarWindow={window} editorMode={false} />
}

const ShowWindowPage: BlitzPage = () => {
  const day = useParam("windowId", "number")
  const sharedId = useParam("sharedId", "string")

  if (!day || !sharedId) {
    return null
  }
  return (
    <Suspense fallback={<div>Laster...</div>}>
      <GetWindow day={day} sharedId={sharedId} />
    </Suspense>
  )
}

ShowWindowPage.getLayout = (page) => (
  <AuthLayout title="Kalenderluke - Din Advent">{page}</AuthLayout>
)

export default ShowWindowPage
