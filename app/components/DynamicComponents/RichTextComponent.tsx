import RichEditor from "app/components/RichEditor"
import { RichText } from "app/interfaces/DynamicInputComponent"
import React from "react"
import draftToHtml from "draftjs-to-html"

export const RichTextComponent = ({ content, onChange, editorMode }: RichText["props"]) => {
	const handleChange = (newContent: any) => {
		onChange({ content: newContent })
	}
	if (editorMode) return <RichEditor editorState={content} onChange={handleChange} />
	const markup = draftToHtml(content)
	return <div dangerouslySetInnerHTML={{ __html: markup }}></div>
}

export default RichTextComponent
