import React, { FC } from "react"
import { Link, useRouter } from "blitz"
import classes from "./Calendar.module.scss"
import { CalendarCreateWithoutUserInput } from "db"

interface CalendarProps {
  calendar: CalendarCreateWithoutUserInput & { id: number }
}

export const Calendar: FC<CalendarProps> = ({ calendar }) => {
  const router = useRouter()
  const windowPath = (day) => router.asPath + "/" + day
  return (
    <div className={classes.calendar}>
      <h1>{calendar.name}</h1>
      <div className={classes.overflow}>
        <ul className={classes.windowList}>
          {new Array(24).fill(0).map((c, i) => {
            const day = i + 1
            return (
              <li key={day}>
                <Link href={windowPath(day)}>
                  <a className={classes.window}>{day}</a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
export default Calendar
