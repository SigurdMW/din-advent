import React from "react"
import Form, { FORM_ERROR } from "app/components/Form"
import { CalendarInputType, CalendarInput } from "../validations"
import LabeledTextField from "app/components/LabeledTextField"

type CalendarFormProps = {
  initialValues: any
  onSubmit: (v: CalendarInputType) => Promise<void>
  submitText: string
}

const CalendarForm = ({ initialValues, onSubmit, submitText }: CalendarFormProps) => {
  return (
    <Form<CalendarInputType>
      submitText={submitText}
      schema={CalendarInput}
      initialValues={initialValues}
      onSubmit={async (values) => {
        try {
          await onSubmit(values)
        } catch (error) {
          return {
            [FORM_ERROR]: "Beklager, en feil oppsto. Vennligst prøv igjen. - " + error.toString(),
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
