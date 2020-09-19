import RichEditor from "app/components/RichEditor"
import { RichText } from "app/interfaces/DynamicInputComponent"
import React from "react"

export const RichTextComponent = ({ content, onChange, ...rest }: RichText["props"]) => {
  const handleChange = (newContent: any) => {
    if (JSON.stringify(newContent) !== JSON.stringify(content)) {
      onChange({ content: newContent })
    }
  }
  return <RichEditor editorState={content} onChange={handleChange} />
}

export default RichTextComponent
