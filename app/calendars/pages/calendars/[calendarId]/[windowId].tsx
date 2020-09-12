import React, { Suspense } from "react"
import { useParam, BlitzPage, useQuery } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"
import getWindow from "app/calendars/queries/getWindow"

const GetWindow = () => {
  const day = useParam("windowId", "number")
  const calendarId = useParam("calendarId", "number")
  const [window] = useQuery(getWindow, { where: { calendarId, day } })
  if (!day || !calendarId) return <div>Error</div>
  return (
    <div>
      Kalenderluke: {day}
      <span>{JSON.stringify(window)}</span>
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
