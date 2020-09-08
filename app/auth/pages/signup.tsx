import React from "react"
import { useRouter, BlitzPage } from "blitz"
import { Form, FORM_ERROR } from "app/components/Form"
import { LabeledTextField } from "app/components/LabeledTextField"
import signup from "app/auth/mutations/signup"
import { SignupInput, SignupInputType } from "app/auth/validations"
import loginRequest from "../mutations/login-request"
import ArticleLayout from "app/layouts/ArticleLayout"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <h1>Opprett bruker</h1>
      <p>Opprett gratis bruker på Din Advent.</p>

      <a href="/api/auth/facebook" className="button small">
        Opprett med Facebook
      </a>
      <br />
      <br />
      <a href="/api/auth/google" className="button small">
        Opprett med Google
      </a>

      <Form<SignupInputType>
        submitText="Opprett bruker"
        schema={SignupInput}
        onSubmit={async (values) => {
          try {
            await signup({ email: values.email })
            await loginRequest({ email: values.email })
            router.push("/login-request")
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "Oi, noe gikk galt-" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="E-post" placeholder="E-post" />
      </Form>
    </div>
  )
}

SignupPage.getLayout = (page) => (
  <ArticleLayout title="Opprett bruker - Din Advent">{page}</ArticleLayout>
)

export default SignupPage
