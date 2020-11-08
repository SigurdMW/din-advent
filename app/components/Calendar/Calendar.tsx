import React, { FC } from "react"
import { Link, useRouter } from "blitz"
import classes from "./Calendar.module.scss"
import { CalendarCreateWithoutUserInput } from "db"
import WhiteSection from "app/calendars/components/WhiteSection"

interface CalendarProps {
	isShare?: boolean
  calendar: CalendarCreateWithoutUserInput & { id: number }
}

export const Calendar: FC<CalendarProps> = ({ calendar, isShare = false }) => {
	const router = useRouter()
	const windowPath = (day) => router.asPath + "/" + day
	const options = calendar.options ? JSON.parse(calendar.options) : {}
	const colorTheme =
    options.background && options.background.colorTheme ? options.background.colorTheme : ""
	const bgImage = options.background && options.background.image ? options.background.image : ""

	const getStyle = () => {
		const bg = bgImage ? { backgroundImage: `url(${bgImage})` } : {}
		const color = colorTheme ? { color: colorTheme === "light" ? "#000" : "#fff" } : { color: "#B97F24" }
		return {
			...bg,
			...color,
		}
	}

	return (
		<WhiteSection style={getStyle()} className={classes.calendar}>
			<div>
				{isShare &&
					<h1>
						{calendar.name}
					</h1>
				}
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
		</WhiteSection>
	)
}
export default Calendar
