import RichEditor from "app/components/RichEditor"
import { RichTextProps } from "app/interfaces/DynamicInputComponent"
import React from "react"

export const RichTextComponent = ({ content }: RichTextProps) => {
  const handleChange = () => {
    // TODO
  }
  return <RichEditor editorState={content} onChange={handleChange} />
}

export default RichTextComponent
