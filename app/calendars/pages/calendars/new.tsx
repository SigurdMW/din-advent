import React from "react"
import { Link, useRouter, BlitzPage } from "blitz"
import createCalendar from "app/calendars/mutations/createCalendar"
import CalendarForm from "app/calendars/components/CalendarForm"
import AuthLayout from "app/layouts/AuthLayout"

const NewCalendarPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      <h1>Opprett ny kalender</h1>

      <CalendarForm
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            const calendarId = await createCalendar({ data: { name: values.name } })
            router.push("/calendars/[calendarId]", `/calendars/${calendarId}`)
          } catch (error) {
            alert("Error creating calendar " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/calendars">
          <a>Kalendere</a>
        </Link>
      </p>
    </>
  )
}

NewCalendarPage.getLayout = (page) => (
  <AuthLayout title="Opprett kalender - Din Advent">{page}</AuthLayout>
)

export default NewCalendarPage
