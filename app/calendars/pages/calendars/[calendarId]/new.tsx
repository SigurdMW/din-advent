import React from "react"
import { useParam, BlitzPage, useQuery } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"
import Form, { FORM_ERROR } from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import { WindowInput } from "app/calendars/validations"
import createWindow from "app/calendars/mutations/createWindow"

const CreateWindowPage: BlitzPage = () => {
  const calendarId = useParam("calendarId", "number")
  return (
    <Form<any>
      submitText="Ny luke"
      schema={WindowInput}
      initialValues={{ day: undefined, content: {}, calendarId }}
      onSubmit={async (values) => {
        try {
          await createWindow({ data: values })
        } catch (error) {
          return {
            [FORM_ERROR]: "Beklager, en feil oppsto. Vennligst prøv igjen. - " + error.toString(),
          }
        }
      }}
    >
      <LabeledTextField name="day" label="Kalenderdag" placeholder="Dag..." type="number" />
    </Form>
  )
}

CreateWindowPage.getLayout = (page) => (
  <AuthLayout title="Ny kalenderluke - Din Advent">{page}</AuthLayout>
)

export default CreateWindowPage
