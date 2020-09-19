import React, { Suspense } from "react"
import { useParam, BlitzPage, useQuery, Link } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"
import getWindow from "app/calendars/queries/getWindow"

const GetWindow = ({ day, calendarId }) => {
  const [window] = useQuery(getWindow, { where: { calendarId, day } })
  return (
    <div>
      Kalenderluke: {day}
      <span>{JSON.stringify(window)}</span>
      <br />
      <br />
      <Link href={`/calendars/${calendarId}`}>Tilbake til kalender</Link>
    </div>
  )
}

const ShowWindowPage: BlitzPage = () => {
  const day = useParam("windowId", "number")
  const calendarId = useParam("calendarId", "number")

  if (!day || !calendarId) {
    return null
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GetWindow day={day} calendarId={calendarId} />
    </Suspense>
  )
}

ShowWindowPage.getLayout = (page) => (
  <AuthLayout title="Kalenderluke - Din Advent">{page}</AuthLayout>
)

export default ShowWindowPage
