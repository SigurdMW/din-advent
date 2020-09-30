import React, { useEffect, useState } from "react"
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import { dynamic } from "blitz"
import classes from "./RichEditor.module.scss"

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
