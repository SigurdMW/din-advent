import React from "react"
import Form, { FORM_ERROR } from "app/components/Form"
import { CalendarInputType, CalendarInput } from "../validations"
import LabeledTextField from "app/components/LabeledTextField"

type CalendarFormProps = {
  initialValues: any
  onSubmit: (v: CalendarInputType) => Promise<void>
}

const CalendarForm = ({ initialValues, onSubmit }: CalendarFormProps) => {
  return (
    <Form<CalendarInputType>
      submitText="Opprett"
      schema={CalendarInput}
      initialValues={{ name: undefined }}
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
      <LabeledTextField name="name" label="Kalendernavn" placeholder="Navn..." />
    </Form>
  )
}

export default CalendarForm
