import React, { FC } from "react"

interface ErrorComponentProps {
  statusCode?: number
  title?: string
  children?: null | React.ReactNode
}

const ErrorComponent: FC<ErrorComponentProps> = ({
  statusCode,
  title = "Serverfeil",
  children = null,
}) => (
  <>
    <h1>
      {statusCode ? statusCode + " " : ""}
      {title}
    </h1>
    {children}
  </>
)

export default ErrorComponent
