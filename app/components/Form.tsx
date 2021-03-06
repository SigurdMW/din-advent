import React, { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import * as z from "zod"
import Alert from "./Alert"
import Button from "./Button"
export { FORM_ERROR } from "final-form"
export { Field } from "react-final-form"

type FormProps<FormValues> = {
  /** All your form fields */
  children: ReactNode
  /** Text to display in the submit button */
  submitText: string
  /**
   * @default false
   */
  disabled?: boolean
  onSubmit: FinalFormProps<FormValues>["onSubmit"]
  initialValues?: FinalFormProps<FormValues>["initialValues"]
  schema?: z.ZodType<any, any>
} & Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit">

export function Form<FormValues extends Record<string, unknown>>({
	children,
	submitText,
	disabled = false,
	schema,
	initialValues,
	onSubmit,
	...props
}: FormProps<FormValues>) {
	return (
		<FinalForm<FormValues>
			initialValues={initialValues}
			validate={(values) => {
				if (!schema) return
				try {
					schema.parse(values)
				} catch (error) {
					return error.formErrors.fieldErrors
				}
			}}
			onSubmit={onSubmit}
			render={({
				handleSubmit,
				submitting,
				submitError,
				valid,
				dirty,
				hasValidationErrors,
				dirtySinceLastSubmit,
			}) => {
				return (
					<form onSubmit={handleSubmit} className="form" {...props}>
						{/* Form fields supplied as children are rendered here */}
						{children}

						{!dirtySinceLastSubmit && submitError && (
							<Alert type={submitError.type || "danger"}>{submitError.message || submitError || "Noe gikk feil :/ Vennligst prøv igjen og gi oss beskjed om feilen gjentar seg."}</Alert>
						)}

						<Button
							type="green"
							buttonType="submit"
							disabled={submitting || disabled || hasValidationErrors || !dirty}
						>
							{submitText}
						</Button>
						<style global jsx>{`
              .form > * + * {
                margin-top: 1rem;
              }
            `}</style>
					</form>
				)
			}}
		/>
	)
}

export default Form
