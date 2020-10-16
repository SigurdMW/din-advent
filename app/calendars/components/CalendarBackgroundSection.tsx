import React from "react"
import { useQuery } from "blitz"
import getCalendar from "app/calendars/queries/getCalendar"
import { CalendarBackgroundColorTheme } from "app/interfaces/CalendarOptions"
import updateCalendar from "app/calendars/mutations/updateCalendar"

const colorTheme: Record<CalendarBackgroundColorTheme, string> = {
  dark: "Mørk",
  light: "Lys",
}

export const CalendarBackgroundSection = ({ calendarId }) => {
  const [calendar, { mutate }] = useQuery(getCalendar, { where: { id: calendarId } })
  const options = calendar.options ? JSON.parse(calendar.options) : {}

  const handleThemeChange = async (val: string) => {
    const newOptions = JSON.stringify({
      ...options,
      background: { ...(options.background || {}), colorTheme: val },
    })
    calendar.options = newOptions
    await updateCalendar({ where: { id: calendarId }, data: { options: newOptions } })
    await mutate(calendar)
  }

  const handleImageChange = async (val: string) => {
    const newOptions = JSON.stringify({
      ...options,
      background: { ...(options.background || {}), image: val },
    })
    calendar.options = newOptions
    await updateCalendar({ where: { id: calendarId }, data: { options: newOptions } })
    await mutate(calendar)
  }
  const selectedColorTheme =
    options.background && options.background.colorTheme ? options.background.colorTheme : ""
  const backgroundImage =
    options.background && options.background.image ? options.background.image : ""
  return (
    <>
      <select onChange={(e) => handleThemeChange(e.target.value)} value={selectedColorTheme}>
        <option value="">Velg en</option>
        {Object.entries(colorTheme).map(([key, value]) => {
          return (
            <option value={key} key={key}>
              {value}
            </option>
          )
        })}
      </select>
    </>
  )
}

export default CalendarBackgroundSection
