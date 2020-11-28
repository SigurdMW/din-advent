import RichEditor from "app/components/RichEditor"
import { RichText } from "app/interfaces/DynamicInputComponent"
import React from "react"
import draftToHtml from "draftjs-to-html"
import classes from "./RichText.module.scss"

export const RichTextComponent = ({ content, onChange, editorMode }: RichText["props"]) => {
	const handleChange = (newContent: any) => {
		onChange({ content: newContent })
	}
	if (editorMode) return <RichEditor editorState={content} onChange={handleChange} />
	const markup = draftToHtml(content)
	return <div dangerouslySetInnerHTML={{ __html: markup }} className={classes.editor}></div>
}

export default RichTextComponent
