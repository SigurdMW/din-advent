import { EditorState } from "draft-js"
import { convertToRaw } from "draft-js"

/**
 * Default value for CalendarWindows
 */
export const getDefaultComponents = () => [
  {
    type: "richtext",
    props: {
      content: convertToRaw(EditorState.createEmpty().getCurrentContent()),
    },
  },
]
