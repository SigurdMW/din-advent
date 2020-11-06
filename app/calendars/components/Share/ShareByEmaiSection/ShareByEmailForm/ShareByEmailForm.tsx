import React, { FC, useState } from "react"
import shareCalendarByEmail from "app/calendars/mutations/shareCalendarByEmail"
import Form, { FORM_ERROR } from "app/components/Form"
import { ShareByEmailInput, ShareByEmailInputType } from "app/calendars/validations"
import LabeledTextField from "app/components/LabeledTextField"
import Button from "app/components/Button"

interface ShareByEmailFormProps {
  calendarId: number
  onShared: () => Promise<void>
}

export const ShareByEmailForm: FC<ShareByEmailFormProps> = ({ calendarId, onShared }) => {
	const [successEmail, setSuccessEmail] = useState<string>("")
	if (successEmail) {
		return (
			<div>
				<h2>🎉 Kalenderen ble delt med {successEmail}</h2>
				<p>{successEmail} får nå en e-post som beskriver hvordan man får tilgang til kalenderen.</p>
				<Button type="secondary" onClick={() => setSuccessEmail("")}>
          Del med en til
				</Button>
			</div>
		)
	}
	return (
		<>
			<Form<ShareByEmailInputType>
				submitText="Del"
				schema={ShareByEmailInput}
				disabled={false}
				initialValues={{ email: undefined }}
				onSubmit={async (values, form) => {
					try {
						await shareCalendarByEmail({ ...values, role: "reader", calendarId })
						setSuccessEmail(values.email)
						if (onShared) await onShared()
						setTimeout(form.reset)
					} catch (error) {
						return {
							[FORM_ERROR]: {type: "danger", message: error && error.message ? error.message : "Noe gikk galt" }
						} 
					}
				}}
			>
				<h2>Del med e-post</h2>
				<p>
          Når du deler med e-post, får personen du deler med en e-post fra dinadvent.no. Dersom
          personen har en bruker på dinadvent.no fra før, holder det at personen logger inn for å få
          tilgang. Hvis personen ikke har en bruker fra før, må personen opprette en bruker med
          e-postadressen der den fikk mailen.
				</p>
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

export default ShareByEmailForm
