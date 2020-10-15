import LabeledTextField from "app/components/LabeledTextField"
import React from "react"
import Form, { FORM_ERROR } from "app/components/Form"
import { AdminInput } from "../validations"

type AdminFormProps = {
  initialValues: any
  onSubmit: (values: { email: string }) => Promise<void>
}

const AdminForm = ({ onSubmit }: AdminFormProps) => {
  return (
    <Form<{ email: string }>
      submitText="Lag"
      schema={AdminInput}
      disabled={false}
      initialValues={{ email: "" }}
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
      <LabeledTextField name="email" label="E-post" id="email" placeholder="E-postadresse" />
    </Form>
  )
}

export default AdminForm
