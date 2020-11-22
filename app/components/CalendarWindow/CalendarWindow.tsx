import { DynamicComponent, DynamicInput, DynamicInputTypes, RichText } from "app/interfaces/DynamicInputComponent"
import React, { FC } from "react"
import DynamicInputRootComponent from "../DynamicInputRootComponent"
import { EditorState, convertToRaw } from "draft-js"

interface CalendarWindowProps {
  calendarWindow: { day: number; id: number; content: any }
  save?: DynamicInput["save"]
  editorMode: boolean
}

interface Props extends Omit<RichText["props"], "editorMode" | "onChange"> {}

const getDefaultComponents = (components: DynamicComponent[]) => {
	if (!components || !Array.isArray(components)) return []
	const defaultComponent: Omit<RichText, "props"> & {props: Props} = {
		type: DynamicInputTypes.richtext,
		props: {
			content: convertToRaw(EditorState.createEmpty().getCurrentContent())
		}
	}
	if (!components.length) return [defaultComponent]
	return components
}

export const CalendarWindow: FC<CalendarWindowProps> = ({ calendarWindow, save, editorMode }) => {
	const components = (JSON.parse(calendarWindow.content) || {}).components
	
	return (
		<div>
			<header>
				<h1>{calendarWindow.day}. desember</h1>
			</header>
			<section>
				<DynamicInputRootComponent
					components={getDefaultComponents(components) as any} // TODO: fix these typings
					id={calendarWindow.id}
					editorMode={editorMode}
					save={save}
				/>
			</section>
		</div>
	)
}

export default CalendarWindow
