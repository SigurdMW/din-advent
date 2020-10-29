import React, { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import * as z from "zod"
import Alert from "./Alert"
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
  handleSubmitError?: (err: string) => ReactNode
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
	handleSubmitError,
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
							<>
								{handleSubmitError ? (
									<>{handleSubmitError(submitError)}</>
								) : (
									<Alert type="danger">{submitError}</Alert>
								)}
							</>
						)}

						<button
							type="submit"
							disabled={submitting || disabled || hasValidationErrors || !dirty}
							className="da-button da-golden-btn"
						>
							{submitText}
						</button>

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
