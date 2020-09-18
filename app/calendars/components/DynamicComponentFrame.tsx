import React from "react"

const DynamicComponentFrame = ({ children, remove }) => {
  return (
    <div>
      <button onClick={remove}>x</button>
      {children}
    </div>
  )
}

export default DynamicComponentFrame
