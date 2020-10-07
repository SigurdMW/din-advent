import { price } from "app/price"
import React from "react"
import Form, { FORM_ERROR, Field } from "app/components/Form"
import { PaymentInputType, PaymentInput } from "../validations"

type PaymentFormProps = {
  initialValues: any
  onSubmit: (v: PaymentInputType) => Promise<void>
  submitText: string
}

const PaymentForm = ({ initialValues, onSubmit, submitText }: PaymentFormProps) => (
  <Form<PaymentInputType>
    submitText={submitText}
    schema={PaymentInput}
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
    <Field name="plan" component="select">
      <option value="">Please select</option>
      {Object.keys(price).map((key) => {
        return (
          <option value={key} key={key}>
            {key}
          </option>
        )
      })}
    </Field>
  </Form>
)

export default PaymentForm
