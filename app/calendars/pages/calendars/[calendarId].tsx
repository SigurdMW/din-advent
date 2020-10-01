import React, { Suspense } from "react"
import { Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getCalendar from "app/calendars/queries/getCalendar"
import deleteCalendar from "app/calendars/mutations/deleteCalendar"
import AuthLayout from "app/layouts/AuthLayout"

export const Calendar = ({ calendarId }) => {
  const router = useRouter()
  const [calendar] = useQuery(getCalendar, { where: { id: calendarId } })

  return (
    <div>
      <h1>
        Kalendernavn <b>{calendar.name}</b>
      </h1>

      <Link href="/calendars/[calendarId]/edit" as={`/calendars/${calendar.id}/edit`}>
        <a>Rediger</a>
      </Link>

      <br />
      <br />

      <ul>
        {new Array(24).fill(0).map((c, i) => (
          <li key={i + 1}>
            <Link
              href="/calendars/[calendarId]/[windowId]"
              as={`/calendars/${calendar.id}/${i + 1}`}
            >
              <a>{i + 1}</a>
            </Link>
          </li>
        ))}
      </ul>

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
