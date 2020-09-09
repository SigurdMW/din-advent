import React from "react"
import { useParam, BlitzPage, useQuery } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"
import getWindow from "app/calendars/queries/getWindow"

const ShowWindowPage: BlitzPage = () => {
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

ShowWindowPage.getLayout = (page) => (
  <AuthLayout title="Kalenderluke - Din Advent">{page}</AuthLayout>
)

export default ShowWindowPage
