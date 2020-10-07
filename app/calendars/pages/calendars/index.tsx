import React, { Suspense } from "react"
import { Link, useQuery, BlitzPage, useSession } from "blitz"
import getCalendars from "app/calendars/queries/getCalendars"
import AuthLayout from "app/layouts/AuthLayout"
import classes from "./calendar.module.scss"

const CalendarItem = ({ calendar, userId }) => (
  <li key={calendar.id} className={classes.listItem}>
    <Link href="/calendars/[calendarId]" as={`/calendars/${calendar.id}`}>
      <a className={classes.calendarItem}>
        <h2>{calendar.name}</h2>
        <p>
          Laget {userId === calendar.userId ? " av deg " : ""}{" "}
          {new Date(calendar.createdAt.toString()).toLocaleDateString()}
        </p>
      </a>
    </Link>
  </li>
)

export const CalendarsList = () => {
  const [calendars] = useQuery(getCalendars, { orderBy: { id: "desc" } })
  const session = useSession()

  return (
    <>
      {calendars.length ? (
        <>
          <hr className="da-divider" />
          <p>Dine kalendere:</p>
          <ul className={classes.list}>
            {calendars.map((calendar) => (
              <CalendarItem calendar={calendar} userId={session.userId} key={calendar.id} />
            ))}
          </ul>
        </>
      ) : (
        <p>
          Du har ingen kalendere ennå.{" "}
          <Link href="/calendars/new">
            <a>Opprett kalender</a>
          </Link>
        </p>
      )}
    </>
  )
}

const CalendarsPage: BlitzPage = () => (
  <>
    <h1>Dine kalendere</h1>

    <p>
      <Link href="/calendars/new">
        <a className="da-button da-btn-large da-golden-btn">Opprett kalender</a>
      </Link>
    </p>

    <Suspense fallback={<div>Laster...</div>}>
      <CalendarsList />
    </Suspense>
  </>
)

CalendarsPage.getLayout = (page) => (
  <AuthLayout title="Dine kalendere - Din Advent">{page}</AuthLayout>
)

export default CalendarsPage
