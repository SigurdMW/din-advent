import React, { Suspense } from "react"
import { Link, useQuery, BlitzPage } from "blitz"
import getCalendars from "app/calendars/queries/getCalendars"
import AuthLayout from "app/layouts/AuthLayout"

export const CalendarsList = () => {
  const [calendars] = useQuery(getCalendars, { orderBy: { id: "desc" } })

  return (
    <ul>
      {calendars.map((calendar) => (
        <li key={calendar.id}>
          <Link href="/calendars/[calendarId]" as={`/calendars/${calendar.id}`}>
            <a>{calendar.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const CalendarsPage: BlitzPage = () => {
  return (
    <>
      <h1>Kalendere</h1>

      <p>
        <Link href="/calendars/new">
          <a>Opprett kalender</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <CalendarsList />
      </Suspense>
    </>
  )
}

CalendarsPage.getLayout = (page) => (
  <AuthLayout title="Dine kalendere - Din Advent">{page}</AuthLayout>
)

export default CalendarsPage
