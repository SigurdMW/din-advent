import React from "react"
import Form, { FORM_ERROR } from "app/components/Form"
import { CalendarInputType, CalendarInput } from "../validations"
import LabeledTextField from "app/components/LabeledTextField"

type CalendarFormProps = {
  initialValues: any
  disabled?: boolean
  onSubmit: (v: CalendarInputType) => Promise<void>
  submitText: string
}

const CalendarForm = ({ initialValues, onSubmit, submitText, disabled }: CalendarFormProps) => {
	return (
		<Form<CalendarInputType>
			submitText={submitText}
			schema={CalendarInput}
			disabled={disabled}
			initialValues={initialValues}
			onSubmit={async (values) => {
				try {
					await onSubmit(values)
				} catch (error) {
					return {
						[FORM_ERROR]: {
							type: "danger", 
							message: error && error.message ? error.message : "Beklager, en feil oppsto. Vennligst prøv igjen.",
						}
					}
				}
			}}
		>
			<LabeledTextField
				name="name"
				label="Kalendernavn"
				placeholder="Navn..."
				id="calendarformfield"
			/>
		</Form>
	)
}

export default CalendarForm
