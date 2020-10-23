import React, { FC, useState } from "react"
import shareCalendarByEmail from "app/calendars/mutations/shareCalendarByEmail"
import Form, { FORM_ERROR } from "app/components/Form"
import { ShareByEmailInput, ShareByEmailInputType } from "app/calendars/validations"
import LabeledTextField from "app/components/LabeledTextField"
import Button from "app/components/Button"

interface ShareByEmailProps {
  calendarId: number
}

export const ShareByEmail: FC<ShareByEmailProps> = ({ calendarId }) => {
  const [successEmail, setSuccessEmail] = useState<string>("")
  if (successEmail)
    return (
      <div>
        <h4>🎉 Kalenderen ble delt med {successEmail}</h4>
        <p>{successEmail} får nå en e-post som beskriver hvordan man får tilgang til kalenderen.</p>
        <Button type="secondary" onClick={() => setSuccessEmail("")}>
          Del med en til
        </Button>
      </div>
    )
  return (
    <>
      <Form<ShareByEmailInputType>
        submitText="Del"
        schema={ShareByEmailInput}
        disabled={false}
        initialValues={{ email: undefined }}
        onSubmit={async (values, form) => {
          try {
            await shareCalendarByEmail({ ...values, calendarId })
            setSuccessEmail(values.email)
            setTimeout(form.reset)
          } catch (error) {
            return {
              [FORM_ERROR]: "Beklager, en feil oppsto. Vennligst prøv igjen. - " + error.toString(),
            }
          }
        }}
      >
        <h4>Del med e-post</h4>
        <LabeledTextField
          name="email"
          type="email"
          label="E-postadresse"
          placeholder="Skriv e-postadressen du vil dele med"
          id="emailshare"
        />
      </Form>
    </>
  )
}

export default ShareByEmail
