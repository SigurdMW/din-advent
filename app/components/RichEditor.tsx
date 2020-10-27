import React, { useEffect, useState } from "react"
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import { dynamic } from "blitz"
import classes from "./RichEditor.module.scss"
import { uploadImageCallBack } from "app/utils/uploadImage"

// https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp
const editorOptions = {
	options: [
		"inline",
		"blockType",
		"fontSize",
		"fontFamily",
		"list",
		"textAlign",
		"link",
		"emoji",
		"image",
		"history",
		"embedded",
	],
	inline: {
		inDropdown: false,
		className: undefined,
		component: undefined,
		dropdownClassName: undefined,
		options: ["bold", "italic", "underline", "strikethrough"],
	},
	image: {
		urlEnabled: true,
		uploadEnabled: true,
		alignmentEnabled: true,
		uploadCallback: async (file) => {
			try {
				const res = await uploadImageCallBack(file)
				return res
			} catch (e) {
				alert(
					"Obs, vi klarte ikke å laster opp bilde. Vennligst prøv igjen. Ved gjentatte problemer, ta kontakt med oss."
				)
			}
		},
		previewImage: false,
		inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
		alt: { present: false, mandatory: false },
		defaultSize: {
			height: "auto",
			width: "auto",
		},
	},
	embedded: {
		icon: undefined,
		className: undefined,
		component: undefined,
		popupClassName: undefined,
		embedCallback: undefined,
		defaultSize: {
			height: "auto",
			width: "auto",
		},
	},
}

const Editor: any = dynamic(
	() => {
		return import("react-draft-wysiwyg").then((mod) => mod.Editor)
	},
	{ loading: () => null, ssr: false }
)

const RichEditor = ({ editorState, onChange }) => {
	const [localEditorState, setLocalEditorState] = useState(() =>
		editorState
			? EditorState.createWithContent(convertFromRaw(editorState))
			: EditorState.createEmpty()
	)

	useEffect(() => {
		onChange(convertToRaw(localEditorState.getCurrentContent()))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [localEditorState])

	return (
		<Editor
			editorState={localEditorState}
			toolbar={editorOptions}
			toolbarClassName="editorToolbar"
			wrapperClassName={classes.wrapper}
			editorClassName={classes.editor}
			onEditorStateChange={setLocalEditorState}
		/>
	)
}

export default RichEditor
