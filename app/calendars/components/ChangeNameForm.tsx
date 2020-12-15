import React from "react"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import { CalendarInput, CalendarInputType } from "../validations"
import updateCalendar from "../mutations/updateCalendar"
import { useMutation, useQuery } from "blitz"
import getCalendar from "../queries/getCalendar"

type ChangeNameFormProps = {
  calendarId: number
}

export const ChangeNameForm = ({ calendarId }: ChangeNameFormProps) => {
	const [calendar, { setQueryData }] = useQuery(getCalendar, { where: { id: calendarId } })	
	const [updateCalendarMutation] = useMutation(updateCalendar)

	return (
		<Form<CalendarInputType>
			submitText="Endre navn"
			schema={CalendarInput}
			initialValues={{ name: calendar.name }}
			onSubmit={async (values) => {
				try {
					const calendar = await updateCalendarMutation({ where: { id: calendarId }, data: { name: values.name } })
					await setQueryData(calendar)
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
			<LabeledTextField name="name" label="Kalendernavn" placeholder="Skriv kalendernavn her..." id="calendarnamechange" />
		</Form>
	)
}

export default ChangeNameForm
