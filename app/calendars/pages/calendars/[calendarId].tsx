import React, { Suspense } from "react"
import { useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getCalendar from "app/calendars/queries/getCalendar"
import deleteCalendar from "app/calendars/mutations/deleteCalendar"
import Layout from "app/layouts/Layout"
import classes from "./calendar.module.scss"
import Calendar from "app/components/Calendar"

export const CalendarRenderer = ({ calendarId }) => {
  const router = useRouter()
  const [calendar] = useQuery(getCalendar, { where: { id: calendarId } })

  // const share = async () => {
  // 	const shareKey = await shareCalendar({ calendarId })
  // 	alert(JSON.stringify(shareKey))
  // }

  const handleDeleteCalendar = async () => {
    if (
      window.confirm(
        "Kalenderen og alt tilhørende innhold vil bli slettet. Handlingen kan ikke angres. Vil du fortsette?"
      )
    ) {
      await deleteCalendar({ where: { id: calendarId } })
      router.push("/calendars")
    }
  }

  return (
    <div className={classes.calendar}>
      <Calendar calendar={calendar} />

      <button className="da-button da-btn-white" type="button" onClick={handleDeleteCalendar}>
        Slett kalender
      </button>
    </div>
  )
}

const ShowCalendarPage: BlitzPage = () => {
  const calendarId = useParam("calendarId", "number")
  if (!calendarId) return null
  return (
    <Suspense fallback={<div>Laster...</div>}>
      <CalendarRenderer calendarId={calendarId} />
    </Suspense>
  )
}

ShowCalendarPage.getLayout = (page) => <Layout title="Kalender - Din Advent">{page}</Layout>

export default ShowCalendarPage
