import React, { useEffect, useState } from "react"
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import { dynamic } from "blitz"

const Editor: any = dynamic(
  () => {
    return import("react-draft-wysiwyg").then((mod) => mod.Editor)
  },
  { loading: () => null, ssr: false }
)

// JSON.stringify(convertToRaw(editorState.getCurrentContent()))

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
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={setLocalEditorState}
    />
  )
}

export default RichEditor
