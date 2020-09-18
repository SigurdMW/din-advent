import React, { Suspense } from "react"
import { useParam, BlitzPage, useQuery, Link } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"
import getWindow from "app/calendars/queries/getWindow"
import { DynamicInputComponent } from "app/calendars/components/DynamicInputComponent"

const GetWindow = () => {
  const day = useParam("windowId", "number")
  const calendarId = useParam("calendarId", "number")
  const [window] = useQuery(getWindow, { where: { calendarId, day } })
  if (!day || !calendarId) return <div>Error</div>

  const components = (JSON.parse(window.content) || {}).components

  return (
    <div>
      Kalenderluke: {day}
      <span>{JSON.stringify(window)}</span>
      <DynamicInputComponent components={components || []} id={window.id} />
      <br />
      <br />
      <Link href={`/calendars/${calendarId}`}>Tilbake til kalender</Link>
    </div>
  )
}

const ShowWindowPage: BlitzPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <GetWindow />
  </Suspense>
)

ShowWindowPage.getLayout = (page) => (
  <AuthLayout title="Kalenderluke - Din Advent">{page}</AuthLayout>
)

export default ShowWindowPage
