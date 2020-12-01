import React, { FC } from "react"
import { Link, Router, useRouter } from "blitz"
import classes from "./Calendar.module.scss"
import { CalendarCreateWithoutUserInput } from "db"
import WhiteSection from "app/calendars/components/WhiteSection"
import { CalendarBackgroundPosition } from "app/interfaces/CalendarOptions"

interface CalendarProps {
	editMode?: boolean
  calendar: CalendarCreateWithoutUserInput & { id: number }
  emptyWindows?: number[]
}

const getBackgroundSize = (size?: CalendarBackgroundPosition) => {
	if (!size) return undefined
	if (size === CalendarBackgroundPosition.fillWidth) {
		return "100% auto"
	}
	if (size === CalendarBackgroundPosition.fillHeight) {
		return "auto 100%"
	}
	return "cover"
}

export const Calendar: FC<CalendarProps> = ({ calendar, editMode = false, emptyWindows }) => {
	const router = useRouter()
	const windowPath = (day) => router.asPath + "/" + day
	const options = calendar.options ? JSON.parse(calendar.options) : {}
	const colorTheme =
    options.background && options.background.colorTheme ? options.background.colorTheme : ""
	const bgImage = options.background && options.background.image ? options.background.image : ""
	const bgPos = options.background && options.background.position ? options.background.position : ""

	const getStyle = () => {
		const bg = bgImage ? { backgroundImage: `url(${bgImage})`, backgroundColor: "transparent" } : {}
		const color = colorTheme ? { color: colorTheme === "light" ? "#000" : "#fff" } : { color: "#B97F24" }
		const pos = { backgroundSize: getBackgroundSize(bgPos) }
		return {
			...bg,
			...color,
			...pos
		}
	}

	return (
		<WhiteSection style={getStyle()} className={classes.calendar}>
			<div>
				{!editMode &&
					<h1>
						{calendar.name}
					</h1>
				}
				<div className={classes.overflow}>
					<ul className={classes.windowList}>
						{[10, 5, 1, 9, 2, 17, 23, 14, 11, 24, 6, 21, 8, 3, 4, 22, 16, 13, 18, 7, 19, 20, 12, 15].map((c) => {
							const day = c
							return (
								<li key={day}>
									<div className={classes.window}>
										<Link href={windowPath(day)}>
											<a>{day}</a>
										</Link>
										{editMode && emptyWindows?.includes(day) && <span onClick={() => Router.push(`/calendars/${calendar.id}/${day}`)} title="Bare redaktører ser dette">Tom luke</span>}
									</div>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</WhiteSection>
	)
}
export default Calendar
