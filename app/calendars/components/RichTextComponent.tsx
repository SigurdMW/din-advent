import RichEditor from "app/components/RichEditor"
import { RichText } from "app/interfaces/DynamicInputComponent"
import React from "react"

export const RichTextComponent = ({ content, onChange }: RichText["props"]) => {
  const handleChange = (newContent: any) => {
    onChange({ content: newContent })
  }
  return <RichEditor editorState={content} onChange={handleChange} />
}

export default RichTextComponent
