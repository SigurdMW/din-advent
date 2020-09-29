import React, { Suspense } from "react"
import { useParam, BlitzPage, useQuery, Link } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"
import getWindow from "app/calendars/queries/getWindow"
import { DynamicInputComponent } from "app/calendars/components/DynamicInputComponent"
import Modal from "react-modal"

Modal.setAppElement("#__next")

const GetWindow = ({ day, calendarId }) => {
  const [window] = useQuery(getWindow, { where: { calendarId, day } })
  const components = (JSON.parse(window.content) || {}).components
  return (
    <div>
      <h1>Kalenderluke: {day}</h1>
      <DynamicInputComponent components={components} id={window.id} />
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
