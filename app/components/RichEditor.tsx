import React, { useEffect, useState } from "react"
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import { dynamic, getAntiCSRFToken } from "blitz"
import classes from "./RichEditor.module.scss"

async function uploadImageCallBack(file) {
  try {
    const data = new FormData()
    data.append("image", file)
    const antiCSRFToken = getAntiCSRFToken()
    const response = await window.fetch("/api/upload", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
      body: data,
    })
    const json = await response.json()
    return json
  } catch (e) {
    alert(
      "Obs, vi klarte ikke å laster opp bilde. Vennligst prøv igjen. Ved gjentatte problemer, ta kontakt med oss."
    )
  }
}

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
    uploadCallback: uploadImageCallBack,
    previewImage: false,
    inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
    alt: { present: false, mandatory: false },
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
  }, [localEditorState])

  return (
    <Editor
      editorState={localEditorState}
      toolbar={editorOptions}
      toolbarClassName="toolbarClassName"
      wrapperClassName={classes.wrapper}
      editorClassName={classes.editor}
      onEditorStateChange={setLocalEditorState}
    />
  )
}

export default RichEditor
