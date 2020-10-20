import React from "react"
import { Field } from "../Form"
import ReCAPTCHA from "react-google-recaptcha"

export const NotARobot = () => (
  <Field name="recaptcha">
    {({ input, meta: { error, submitError, touched } }) => {
      const actualError = error || submitError
      return (
        <>
          <ReCAPTCHA onChange={input.onChange} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY} />
          {actualError && touched && <span style={{ color: "red" }}>{actualError}</span>}
        </>
      )
    }}
  </Field>
)

export default NotARobot
