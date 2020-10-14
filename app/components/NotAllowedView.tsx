import React, { FC } from "react"

export const NotAllowedView: FC<{ day: number }> = ({ day }) => (
  <div>
    <h1>{day}. desember</h1>
    <p>Denne luken må du vente litt til med å åpne... 😉</p>
  </div>
)

export default NotAllowedView
