import React, { useState } from "react"
import { Link, useRouter, BlitzPage, useMutation } from "blitz"
import createCalendar from "app/calendars/mutations/createCalendar"
import CalendarForm from "app/calendars/components/CalendarForm"
import HeroBanner from "app/components/HeroBanner"
import FullWidthLayout from "app/layouts/FullWidthLayout"

const NewCalendarPage: BlitzPage = () => {
	const [isCreating, setIsCreating] = useState(false)
	const router = useRouter()
	const [createCalendarMutation] = useMutation(createCalendar)

	return (
		<HeroBanner>
			<h1>Opprett ny kalender</h1>
			<p>Navnet på kalenderen er synlig for den du deler den med. Du kan endre navnet senere.</p>

			<CalendarForm
				submitText="Opprett"
				disabled={isCreating}
				initialValues={{ name: undefined }}
				onSubmit={async (values) => {
					try {
						setIsCreating(true)
						const calendarId = await createCalendarMutation({ data: { name: values.name } })
						router.push("/calendars/[calendarId]", `/calendars/${calendarId}`)
					} catch (error) {
						throw error
					} finally {
						setIsCreating(false)
					}
				}}
			/>

			<hr className="da-divider" />

			<p>
				<Link href="/calendars">
					<a>Tilbake til dine kalendere</a>
				</Link>
			</p>
		</HeroBanner>
	)
}

NewCalendarPage.getLayout = (page) => (
	<FullWidthLayout title="Opprett kalender - Din Advent">{page}</FullWidthLayout>
)

export default NewCalendarPage
