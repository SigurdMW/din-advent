import React, { FC, useState } from "react"
import Form, { FORM_ERROR } from "app/components/Form"
import { NewCollaboratorInput, NewCollaboratorInputType } from "app/calendars/validations"
import LabeledTextField from "app/components/LabeledTextField"
import Button from "app/components/Button"
import { ErrorName } from "app/utils/errors"
import AddRole from "./AddRole"
import ShareError from "app/calendars/components/Share/ShareError"
import newCollaborator from "app/calendars/mutations/newCollaborator"
import { AvailableRoles } from "app/calendars/utils"

interface InviteCollaborateFormProps {
  calendarId: number
  onShared: () => Promise<void>
}

export const InviteCollaborateForm: FC<InviteCollaborateFormProps> = ({ calendarId, onShared }) => {
	const [successEmail, setSuccessEmail] = useState<string>("")
	if (successEmail) {
		return (
			<div>
				<h2>🎉 Kalenderen ble delt med {successEmail}</h2>
				<p>{successEmail} får nå en e-post som beskriver hvordan man får tilgang til kalenderen.</p>
				<Button type="secondary" buttonType="button" onClick={() => setSuccessEmail("")}>
          Del med en til
				</Button>
			</div>
		)
	}
	return (
		<>
			<Form<NewCollaboratorInputType>
				submitText="Del"
				schema={NewCollaboratorInput}
				disabled={false}
				initialValues={{ email: undefined, roles: undefined }}
				handleSubmitError={(name: ErrorName) => {
					return <ShareError errorType={name} />
				}}
				onSubmit={async (values, form) => {
					try {
						const roles = values.roles as AvailableRoles[]
						await newCollaborator({ ...values, roles, calendarId })
						setSuccessEmail(values.email)
						if (onShared) await onShared()
						setTimeout(form.reset)
					} catch (error) {
						return {
							[FORM_ERROR]: error.name ? error.name : ErrorName.GeneralError,
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
				<AddRole />
			</Form>
		</>
	)
}

export default InviteCollaborateForm
