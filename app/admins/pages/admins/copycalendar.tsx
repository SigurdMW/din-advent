import React, { useState } from "react"
import { Link, BlitzPage } from "blitz"
import ArticleLayout from "app/layouts/ArticleLayout"
import LabeledTextField from "app/components/LabeledTextField"
import Form, { FORM_ERROR } from "app/components/Form"
import { CopyCalendarInput } from "app/admins/validations"
import copyCalendar from "app/admins/mutations/copyCalendar"
import Alert from "app/components/Alert"

const CopyCalendarForm = () => {
	const [success, setSucces] = useState("")
	return (
		<Form<{ email?: string, calendarId: number }>
			submitText="Kopier"
			schema={CopyCalendarInput}
			disabled={false}
			initialValues={{ email: undefined, calendarId: undefined }}
			onSubmit={async (values) => {
				try {
					const calendarId = await copyCalendar({ data: values })
					setSucces("Suksess med å kopiere kalender! Ny kalender har id " + calendarId)
				} catch (error) {
					return {
						[FORM_ERROR]: {
							type: "danger",
							message: error && error.message ? error.message : "Beklager, en feil oppsto. Vennligst prøv igjen."
						}
					}
				}
			}}
		>
			{success && <Alert type="success">{success}</Alert>}
			<p>Dersom e-postadresse ikke oppgis så kopieres kalender til samme bruker som eier kalender som kopieres.</p>
			<LabeledTextField name="email" label="E-post" id="email" placeholder="E-postadresse (valgfri)" />
			<LabeledTextField name="calendarId" label="Kalender ID" id="calendarid" placeholder="Kalender ID" type="number" />
		</Form>
	)
}

const CopyCalendarPage: BlitzPage = () => {
	return (
		<div>
			<h1>Kopier kalender</h1>
			<CopyCalendarForm />

			<p>
				<Link href="/admins">
					<a>Tilbake til admin-side</a>
				</Link>
			</p>
		</div>
	)
}

CopyCalendarPage.getLayout = (page) => <ArticleLayout title="Kopier kalender">{page}</ArticleLayout>

export default CopyCalendarPage
