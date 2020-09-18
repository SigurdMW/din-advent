import React, { useEffect, useState } from "react"
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  convertFromRaw,
  convertToRaw,
} from "draft-js"

// thanks to https://codesandbox.io/s/n0ozyqr9z4?from-embed=&file=/src/components/entities/mediaBlockRenderer.js
// https://medium.com/@siobhanpmahoney/building-a-rich-text-editor-with-react-and-draft-js-part-2-4-persisting-data-to-server-cd68e81c820
// https://codesandbox.io/s/n0ozyqr9z4?from-embed=&file=/src/components/PageContainer.js
const mediaBlockRenderer = (block) => {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false,
    }
  }

  return null
}

const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))
  const { src } = entity.getData()
  const type = entity.getType()

  if (type === "image" && src) {
    return <img src={src} alt="" />
  }

  // if (type === "video" && src) {
  // 	return (
  // 		<video width="320" height="240" controls>
  // 			<source src={src} type="video/mp4" />
  // 			Your browser does not support the video tag.
  // 		</video>
  // 	)
  // }

  return null
}

const styleMap = {
  ALIGNLEFT: {
    textAlign: "left",
    display: "block",
  },
  ALIGNRIGHT: {
    textAlign: "right",
    display: "block",
  },
  ALIGNCENTER: {
    textAlign: "center",
    display: "block",
  },
}

interface RichEditorProps {
  editorState?: string
  onChange: (editorState: string) => void
}

export const RichEditor = ({ editorState, onChange }: RichEditorProps) => {
  const [editorLocalState, setEditorLocalState] = useState(() =>
    editorState
      ? EditorState.createWithContent(convertFromRaw(editorState))
      : EditorState.createEmpty()
  )

  useEffect(() => {
    onChange(convertToRaw(editorLocalState.getCurrentContent()))
  }, [editorLocalState])

  const toggleCode = () => {
    setEditorLocalState(RichUtils.toggleCode(editorLocalState))
  }

  const toggleUnderline = () => {
    setEditorLocalState(RichUtils.toggleInlineStyle(editorLocalState, "UNDERLINE"))
  }

  const toggleBold = () => {
    setEditorLocalState(RichUtils.toggleInlineStyle(editorLocalState, "BOLD"))
  }

  const toggleItalic = () => {
    setEditorLocalState(RichUtils.toggleInlineStyle(editorLocalState, "ITALIC"))
  }

  const toggleLeftAlign = () => {
    setEditorLocalState(RichUtils.toggleInlineStyle(editorLocalState, "ALIGNLEFT"))
  }

  const toggleCenterAlign = () => {
    setEditorLocalState(RichUtils.toggleInlineStyle(editorLocalState, "ALIGNCENTER"))
  }

  const toggleRightAlign = () => {
    setEditorLocalState(RichUtils.toggleInlineStyle(editorLocalState, "ALIGNRIGHT"))
  }

  const addImage = (e) => {
    e.preventDefault()
    const editorState = editorLocalState
    const urlValue = window.prompt("Paste Image Link")
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity("image", "IMMUTABLE", {
      src: urlValue,
    })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      "create-entity"
    )
    setEditorLocalState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " "))
  }

  // const addVideo = (e) => {
  // 	e.preventDefault();
  // 	const editorState = editorLocalState
  // 	const urlValue = window.prompt("Paste Video Link")
  // 	const contentState = editorState.getCurrentContent()
  // 	const contentStateWithEntity = contentState.createEntity(
  // 		"video",
  // 		"IMMUTABLE",
  // 		{ src: urlValue }
  // 	)
  // 	const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
  // 	const newEditorState = EditorState.set(
  // 		editorState,
  // 		{ currentContent: contentStateWithEntity },
  // 		"create-entity"
  // 	)
  // 	setEditorLocalState(
  // 		AtomicBlockUtils.insertAtomicBlock(
  // 			newEditorState,
  // 			entityKey,
  // 			" "
  // 		)
  // 	)
  // }

  // Required for SSR (...?)
  // if (!window) return null
  return (
    <>
      <button onClick={toggleCode}>Code</button>
      <button onClick={toggleBold}>Bold</button>
      <button onClick={toggleItalic}>Italic</button>
      <button onClick={toggleUnderline}>Underline</button>
      <button onClick={toggleLeftAlign}>Left</button>
      <button onClick={toggleCenterAlign}>Center</button>
      <button onClick={toggleRightAlign}>Right</button>
      <button onClick={addImage}>Image</button>
      {/* <button onClick={addVideo}>Video</button> */}
      <Editor
        editorState={editorLocalState}
        onChange={setEditorLocalState}
        customStyleMap={styleMap}
        blockRendererFn={mediaBlockRenderer}
      />
    </>
  )
}

export default RichEditor
