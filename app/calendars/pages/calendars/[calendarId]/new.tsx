import React from "react"
import { useParam, BlitzPage, Router } from "blitz"
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
      initialValues={{ day: undefined, content: { components: [] }, calendarId }}
      onSubmit={async (values) => {
        try {
          const window = await createWindow({ data: values })
          Router.push(`/calendars/${calendarId}/${window.day}`)
        } catch (error) {
          return {
            [FORM_ERROR]: "Beklager, en feil oppsto. Vennligst prøv igjen. - " + error.toString(),
          }
        }
      }}
    >
      <LabeledTextField
        name="day"
        label="Kalenderdag"
        placeholder="Dag..."
        type="number"
        id="newwindowfield"
      />
    </Form>
  )
}

CreateWindowPage.getLayout = (page) => (
  <AuthLayout title="Ny kalenderluke - Din Advent">{page}</AuthLayout>
)

export default CreateWindowPage
