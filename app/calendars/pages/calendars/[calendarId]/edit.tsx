import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getCalendar from "app/calendars/queries/getCalendar"
import updateCalendar from "app/calendars/mutations/updateCalendar"
import CalendarForm from "app/calendars/components/CalendarForm"

export const EditCalendar = () => {
  const router = useRouter()
  const calendarId = useParam("calendarId", "number")
  const [{ calendar, windows }, { mutate }] = useQuery(getCalendar, { where: { id: calendarId } })

  return (
    <div>
      <h1>Edit Calendar {calendar.id}</h1>
      <pre>{JSON.stringify(calendar)}</pre>

      <CalendarForm
        initialValues={calendar}
        onSubmit={async () => {
          try {
            const updated = await updateCalendar({
              where: { id: calendarId },
              data: { name: "MyNewName" },
            })
            mutate({ calendar: updated, windows })
            alert("Success!" + JSON.stringify(updated))
            router.push("/calendars/[calendarId]", `/calendars/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating calendar " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditCalendarPage: BlitzPage = () => (
  <>
    <Suspense fallback={<div>Loading...</div>}>
      <EditCalendar />
    </Suspense>

    <p>
      <Link href="/calendars">
        <a>Calendars</a>
      </Link>
    </p>
  </>
)

EditCalendarPage.getLayout = (page) => (
  <Layout title="Oppdater kalender - Din Advent">{page}</Layout>
)

export default EditCalendarPage
