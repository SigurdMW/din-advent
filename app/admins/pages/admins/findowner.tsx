import React, { Suspense, useState } from "react"
import { Link, BlitzPage, useQuery } from "blitz"
import ArticleLayout from "app/layouts/ArticleLayout"
import LabeledTextField from "app/components/LabeledTextField"
import Form, { FORM_ERROR } from "app/components/Form"
import getCalendarOwner from "app/admins/queries/getCalendarOwner"
import Button from "app/components/Button"
import { FindOwnerInput } from "app/admins/validations"

const CalendarIdForm = ({ onSubmit }) => {
	return (
		<Form<{ calendarId: number }>
			submitText="Finn bruker"
			schema={FindOwnerInput}
			disabled={false}
			initialValues={{ calendarId: undefined }}
			onSubmit={async (values) => {
				try {
					onSubmit(values)
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
			<LabeledTextField name="calendarId" label="Kalender ID" id="calendarid" placeholder="Kalender ID" type="number" />
		</Form>
	)
}


const UserInfo = ({ calendarId, reset }) => {
	const [user] = useQuery(getCalendarOwner, calendarId)
	if (!user) return (
		<>
			<h1>Ingen bruker funnet</h1>
			<Button type="primary" onClick={reset}>Nullstill</Button>
		</>
	)
	return (
		<>
			<h2>Om bruker</h2>
			{["name", "email", "id", "active", "plan"].map((k) => <div>{k}: {user[k]}</div>)}
			<Button type="primary" onClick={reset}>Nullstill</Button>
		</>
	)
}


const FindOwnerPage: BlitzPage = () => {
	const [calendarId, setCalendarId] = useState<null | number>(null)

	const content = (child: any) => {
		return (
			<div>
				<h1>Finn kalendereier</h1>
				<p>Finn kalendereier basert på kalender ID</p>

				{child}

				<p>
					<Link href="/admins">
						<a>Tilbake til admin-side</a>
					</Link>
				</p>
			</div>
		)
	}

	if (calendarId) {
		return content(
			<Suspense fallback={<div>Laster...</div>}>
				<UserInfo calendarId={calendarId} reset={() => setCalendarId(null)} />
			</Suspense>
		)
	}
	return content(<CalendarIdForm onSubmit={(v) => setCalendarId(v.calendarId)} />)
}

FindOwnerPage.getLayout = (page) => <ArticleLayout title="Finn kalendereier">{page}</ArticleLayout>

export default FindOwnerPage
