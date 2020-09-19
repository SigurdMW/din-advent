import React, { Suspense } from "react"
import { Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getCalendar from "app/calendars/queries/getCalendar"
import deleteCalendar from "app/calendars/mutations/deleteCalendar"
import AuthLayout from "app/layouts/AuthLayout"

export const Calendar = ({ calendarId }) => {
  const router = useRouter()
  const [{ calendar, windows }] = useQuery(getCalendar, { where: { id: calendarId } })

  return (
    <div>
      <h1>
        {calendar.name} - id: {calendar.id}
      </h1>
      <pre>{JSON.stringify(calendar, null, 2)}</pre>

      <Link href="/calendars/[calendarId]/edit" as={`/calendars/${calendar.id}/edit`}>
        <a>Rediger</a>
      </Link>

      <br />
      <br />

      <Link href="/calendars/[calendarId]/new" as={`/calendars/${calendar.id}/new`}>
        <a>Ny kalenderluke</a>
      </Link>

      {windows.length ? (
        <ul>
          {windows.map((window) => (
            <li key={window.id}>
              <Link
                href="/calendars/[calendarId]/[windowId]"
                as={`/calendars/${calendar.id}/${window.day}`}
              >
                <a>{window.day}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ingen luker enda</p>
      )}

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteCalendar({ where: { id: calendar.id } })
            router.push("/calendars")
          }
        }}
      >
        Slett
      </button>
    </div>
  )
}

const ShowCalendarPage: BlitzPage = () => {
  const calendarId = useParam("calendarId", "number")
  if (!calendarId) return null
  return (
    <>
      <p>
        <Link href="/calendars">
          <a>Kalendere</a>
        </Link>
      </p>

      <Suspense fallback={<div>Laster...</div>}>
        <Calendar calendarId={calendarId} />
      </Suspense>
    </>
  )
}

ShowCalendarPage.getLayout = (page) => <AuthLayout title="Kalender - Din Advent">{page}</AuthLayout>

export default ShowCalendarPage
