import React, { Suspense } from "react"
import { Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getCalendar from "app/calendars/queries/getCalendar"
import deleteCalendar from "app/calendars/mutations/deleteCalendar"
import Layout from "app/layouts/Layout"
import classes from "./calendar.module.scss"

const CalendarWindow = ({ day, id }) => (
  <Link href="/calendars/[calendarId]/[windowId]" as={`/calendars/${id}/${day}`}>
    <a className={classes.window}>{day}</a>
  </Link>
)

export const Calendar = ({ calendarId }) => {
  const router = useRouter()
  const [calendar] = useQuery(getCalendar, { where: { id: calendarId } })

  return (
    <div className={classes.calendar}>
      <h1>{calendar.name}</h1>

      {/* <Link href="/calendars/[calendarId]/edit" as={`/calendars/${calendar.id}/edit`}>
        <a>Rediger</a>
      </Link> */}

      <ul className={classes.windowList}>
        {new Array(24).fill(0).map((c, i) => (
          <li key={i + 1}>
            <CalendarWindow day={i + 1} id={calendarId} />
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
    <Suspense fallback={<div>Laster...</div>}>
      <Calendar calendarId={calendarId} />
    </Suspense>
  )
}

ShowCalendarPage.getLayout = (page) => <Layout title="Kalender - Din Advent">{page}</Layout>

export default ShowCalendarPage
