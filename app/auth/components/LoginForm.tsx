import React from "react"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import { LoginInput, LoginInputType } from "app/auth/validations"
import loginRequest from "../mutations/login-request"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  return (
    <div>
      <h1>Login</h1>

      <Form<LoginInputType>
        submitText="Log In"
        schema={LoginInput}
        initialValues={{ email: undefined }}
        onSubmit={async (values) => {
          try {
            await loginRequest({ email: values.email })
            props.onSuccess && props.onSuccess()
          } catch (error) {
            return {
              [FORM_ERROR]:
                "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
      </Form>
    </div>
  )
}

export default LoginForm
