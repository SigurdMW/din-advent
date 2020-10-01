import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  id: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = React.forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, id, ...props }, ref) => {
    const {
      input: { onChange, ...inputRest },
      meta: { touched, error, submitError, submitting },
    } = useField(name)

    return (
      <div {...outerProps}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          {...inputRest}
          onChange={(v) =>
            onChange(props.type === "number" ? Number(v.target.value) : v.target.value)
          }
          disabled={submitting}
          {...props}
          ref={ref}
        />

        {touched && (error || submitError) && (
          <div role="alert" style={{ color: "red" }}>
            {error || submitError}
          </div>
        )}
      </div>
    )
  }
)

export default LabeledTextField
