import { DynamicInput, DynamicInputTypes } from "app/interfaces/DynamicInputComponent"
import React from "react"
import RichTextComponent from "./RichTextComponent"

export const DynamicInputComponent = (props: DynamicInput) => {
  if (!props || !props.components) {
    // TODO: log here
    return null
  }
  return props.components.map((component) => {
    switch (component.type) {
      case DynamicInputTypes.richtext:
        return <RichTextComponent {...(component.props || {})} />
      case DynamicInputTypes.confetti:
        return null
      default:
        return null
    }
  })
}
