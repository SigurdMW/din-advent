import React from "react"
import { useQuery } from "blitz"
import getCalendar from "app/calendars/queries/getCalendar"
import { CalendarBackgroundColorTheme } from "app/interfaces/CalendarOptions"
import updateCalendar from "app/calendars/mutations/updateCalendar"
import UploadImage from "app/components/UploadImage"
import Button from "app/components/Button"
import classes from "./CalendarBackgroundSection.module.scss"
import { deleteImage } from "app/utils/deleteImage"

const colorTheme: Record<CalendarBackgroundColorTheme, string> = {
  dark: "Mørk",
  light: "Lys",
}

export const CalendarBackgroundSection = ({ calendarId }) => {
  const [calendar, { mutate }] = useQuery(getCalendar, { where: { id: calendarId } })
  const options = calendar.options ? JSON.parse(calendar.options) : {}
  const selectedColorTheme =
    options.background && options.background.colorTheme ? options.background.colorTheme : ""
  const backgroundImage =
    options.background && options.background.image ? options.background.image : ""

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

  const handleRemove = async () => {
    if (window.confirm("Er du sikker på at du vil fjerne bilde? Handlingen kan ikke angres.")) {
      const image = backgroundImage
      await handleImageChange("")
      await deleteImage(image)
    }
  }

  return (
    <>
      {backgroundImage && (
        <>
          <label htmlFor="bgimage" className={classes.label}>
            Ditt bakgrunnsbilde
          </label>
          <div className={classes.urlContainer}>
            <img src={backgroundImage} className={classes.img} alt="kalenderbakgrunn" />
            <Button type="secondary" onClick={handleRemove}>
              Fjern bilde
            </Button>
          </div>
        </>
      )}
      <UploadImage onSubmit={(url) => handleImageChange(url)} />
      <label htmlFor="selectcolortheme">Fargetema</label>
      <select
        onChange={(e) => handleThemeChange(e.target.value)}
        value={selectedColorTheme}
        id="selectcolortheme"
      >
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
