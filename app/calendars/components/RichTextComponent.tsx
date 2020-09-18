import RichEditor from "app/components/RichEditor"
import { RichText } from "app/interfaces/DynamicInputComponent"
import React from "react"

export const RichTextComponent = ({ content, onChange, ...rest }: RichText["props"]) => {
  console.log("Props", { content, ...rest })
  const handleChange = (e: any) => {
    console.log("from handle change", { changed: e, original: content })
    if (e.content !== content) {
      onChange({ content: e })
    }
  }
  return <RichEditor editorState={content} onChange={handleChange} />
}

export default RichTextComponent
