import React, { Suspense } from "react"
import { useParam, BlitzPage, useQuery, Link } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"
import getWindow from "app/calendars/queries/getWindow"
import RichEditor from "app/components/RichEditor"
import { ConfettiComponent } from "app/calendars/components/ConfettiComponent"

const GetWindow = () => {
  const day = useParam("windowId", "number")
  const calendarId = useParam("calendarId", "number")
  const [window] = useQuery(getWindow, { where: { calendarId, day } })
  if (!day || !calendarId) return <div>Error</div>

  const handleChange = (richText: string) => {
    // todo
  }

  return (
    <div>
      Kalenderluke: {day}
      <span>{JSON.stringify(window)}</span>
      <RichEditor onChange={handleChange} />
      <ConfettiComponent />
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
