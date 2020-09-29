import React, { Suspense } from "react"
import { Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getCalendar from "app/calendars/queries/getCalendar"
import updateCalendar from "app/calendars/mutations/updateCalendar"
import CalendarForm from "app/calendars/components/CalendarForm"
import ArticleLayout from "app/layouts/ArticleLayout"

export const EditCalendar = () => {
  const router = useRouter()
  const calendarId = useParam("calendarId", "number")
  const [calendar, { mutate }] = useQuery(getCalendar, { where: { id: calendarId } })

  return (
    <div>
      <h1>
        Edit {calendar.name} - id: {calendar.id}
      </h1>
      <pre>{JSON.stringify(calendar)}</pre>

      <CalendarForm
        submitText="Oppdater"
        initialValues={calendar}
        onSubmit={async (values) => {
          try {
            const updated = await updateCalendar({
              where: { id: calendarId },
              data: { name: values.name },
            })
            mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/calendars/[calendarId]", `/calendars/${updated.id}`)
          } catch (error) {
            console.error(error)
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
  <ArticleLayout title="Oppdater kalender - Din Advent">{page}</ArticleLayout>
)

export default EditCalendarPage
