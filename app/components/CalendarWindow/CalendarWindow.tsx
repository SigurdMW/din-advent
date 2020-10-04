import { DynamicInput } from "app/interfaces/DynamicInputComponent"
import React, { FC } from "react"
import DynamicInputRootComponent from "../DynamicInputRootComponent"

interface CalendarWindowProps {
  calendarWindow: { day: number; id: number; content: any }
  save?: DynamicInput["save"]
  editorMode: boolean
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
          components={components}
          id={calendarWindow.id}
          editorMode={editorMode}
          save={save}
        />
      </section>
    </div>
  )
}

export default CalendarWindow
