import React, { useEffect, useState } from "react"
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import { dynamic } from "blitz"
import classes from "./RichEditor.module.scss"
import { uploadImageCallBack } from "app/utils/uploadImage"
import { ErrorName, ValidationError } from "app/utils/errors"

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
		"colorPicker"
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
			const max = 10 // MB
			const mbInBytes = 1048576
			
			try {
				if (file.size && file.size > (max * mbInBytes)) {
					throw new ValidationError()
				}
				const res = await uploadImageCallBack(file)
				return res
			} catch (e) {
				if (e.name === ErrorName.ValidationError) {
					alert(`Bildet du lastet opp er for stort. Maks størrelse er ${max}MB.`)
				} else {
					alert(
						"Obs, vi klarte ikke å laster opp bilde. Vennligst prøv igjen. Ved gjentatte problemer, ta kontakt med oss."
					)
				}
			}
		},
		previewImage: true,
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
	colorPicker: {
		icon: "/icons/color-wheel.svg",		
		className: classes.colorPicker,
		component: undefined,
		popupClassName: undefined,
		colors: ["rgba(0,0,0,0)", "rgb(255,255,255)", "rgb(0,0,0)", "rgb(255,0,0)", "rgb(255,255,0)", "rgb(0,0,255)", "rgb(255, 165,0)", "rgb(0,128,0)"],
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
			placeholder="Skriv noe her..."
			onEditorStateChange={setLocalEditorState}
		/>
	)
}

export default RichEditor
