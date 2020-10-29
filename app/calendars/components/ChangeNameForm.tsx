import React, { useState } from "react"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import { CalendarInput, CalendarInputType } from "../validations"
import updateCalendar from "../mutations/updateCalendar"
import { useQuery } from "blitz"
import getCalendar from "../queries/getCalendar"

type ChangeNameFormProps = {
  calendarId: number
//   mutate: (v: CalendarInputType) => Promise<void>
}

export const ChangeNameForm = ({ calendarId }: ChangeNameFormProps) => {
	const [calendar, { mutate }] = useQuery(getCalendar, { where: { id: calendarId } })
	const [name, setName] = useState(calendar.name)
	return (
		<Form<CalendarInputType>
			submitText="Endre navn"
			schema={CalendarInput}
			initialValues={{ name: calendar.name }}
			onSubmit={async (values) => {
				try {
					const calendar = await updateCalendar({ where: { id: calendarId }, data: { name: values.name } })
					await mutate(calendar)
				} catch (error) {
					return {
						[FORM_ERROR]: "Beklager, en feil oppsto. Vennligst prøv igjen. - " + error.toString(),
					}
				}
			}}
		>
			<LabeledTextField name="name" label="Kalendernavn" placeholder="Skriv kalendernavn her..." id="calendarnamechange" />
		</Form>
	)
}

export default ChangeNameForm
