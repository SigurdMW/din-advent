import React from "react"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import { LoginInput, LoginInputType } from "app/auth/validations"
import loginRequest from "../mutations/login-request"
import { Link } from "blitz"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  return (
    <div>
      <h1>Logg inn</h1>
      <a href="/api/auth/facebook" className="button small">
        Logg inn med Facebook
      </a>
      <br />
      <br />
      <a href="/api/auth/google" className="button small">
        Logg inn med Google
      </a>
      <br />
      <br />
      <Form<LoginInputType>
        submitText="Logg inn"
        schema={LoginInput}
        initialValues={{ email: undefined }}
        onSubmit={async (values) => {
          try {
            await loginRequest({ email: values.email })
            props.onSuccess && props.onSuccess()
          } catch (error) {
            return {
              [FORM_ERROR]: "Beklager, en feil oppsto. Vennligst prøv igjen. - " + error.toString(),
            }
          }
        }}
      >
        <LabeledTextField name="email" label="E-post" placeholder="E-post" />
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
