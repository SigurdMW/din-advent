import React from "react"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import { LoginInput, LoginInputType } from "app/auth/validations"
import loginRequest from "../mutations/login-request"
import { Link } from "blitz"
import FacebookButton from "./FacebookButton"
import GoogleButton from "./GoogleButton"
import NotARobot from "app/components/NotARobot"

type LoginFormProps = {
  onSuccess?: (email: string) => void
}

export const LoginForm = (props: LoginFormProps) => {
	return (
		<div>
			<h1>Logg inn</h1>
			<FacebookButton>Logg inn med Facebook</FacebookButton>
			<br />
			<br />
			<GoogleButton>Logg inn med Google</GoogleButton>
			<hr className="da-divider" />
			<Form<LoginInputType>
				submitText="Logg inn"
				schema={LoginInput}
				initialValues={{ email: undefined, recaptcha: undefined }}
				onSubmit={async (values) => {
					try {
						await loginRequest({ email: values.email, recaptcha: values.recaptcha })
						props.onSuccess && props.onSuccess(values.email)
					} catch (error) {
						return {
							[FORM_ERROR]: {
								type: "danger", 
								message: error && error.message ? error.message : "Beklager, en feil oppsto. Vennligst prøv igjen."
							}
						}
					}
				}}
			>
				<LabeledTextField name="email" label="E-post" placeholder="E-post" id="loginformid" />
				<NotARobot />
			</Form>
			<br />
			<br />
      Ingen bruker enda?{" "}
			<Link href="/signup">
				<a className="button small">Opprett bruker</a>
			</Link>
		</div>
	)
}

export default LoginForm
