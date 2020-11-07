import React, { FC, useEffect, useRef, useState } from "react"
import classes from "./CalendarItem.module.scss"
import { Calendar, User } from "db"
import { Link } from "blitz"
import { calendarIcon, shareIcon } from "app/components/icons"

interface CalendarItemProps {
	calendar: Calendar & { user: User, lastUpdateBy: User | null },
	userId: number
}

const SingleLineOverflow = ({ text, width = "100%" }: { text: string, width?: string }) => (
	<span style={{ width }} className={classes.singleLine} title={text}>{text}</span>
)

const CalendarItem: FC<CalendarItemProps> = ({ calendar, userId }) => {
	const [pWidth, setPWidth] = useState<string | undefined>()
	const paragraphRef = useRef<HTMLParagraphElement>(null)
	
	useEffect(() => {
		const handleResize = () => {
			if (paragraphRef.current) {
				setPWidth(paragraphRef.current.offsetWidth + "px")
			}
		}
		window.addEventListener("resize", handleResize)
		handleResize()
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [paragraphRef])

	const createdByMe = userId === calendar.userId
	const emailFirstPart = calendar.user.email.split("@")[0]
	const displayName = calendar.user.name || emailFirstPart
	const lastEditByUser = calendar.lastUpdateById ? calendar.lastUpdateById === userId : true
	const lastEditUser = calendar.lastUpdateBy
	const lastEditUserDisplayName = lastEditUser ? lastEditUser.name ? lastEditUser.name : lastEditUser.email : ""

	const createdByText = "Laget av " + (createdByMe ? "deg " : displayName) + " " + calendar.createdAt.toLocaleDateString()
	return (
		<Link href="/calendars/[calendarId]" as={`/calendars/${calendar.id}`}>
			<a className={classes.item}>
				<span className={classes.icon} aria-hidden="true">
					{calendarIcon}
				</span>
				<span className={classes.text}>
					<h2 title={calendar.name}>{calendar.name}</h2>
					{!createdByMe && <div className={classes.itemSvg} title={"Kalender delt med deg av " + displayName}>{shareIcon}</div>}
					<p ref={paragraphRef}>
						<SingleLineOverflow text={createdByText} width={pWidth} />
						<SingleLineOverflow text={"Sist endret " + calendar.updatedAt.toLocaleDateString()} width={pWidth} />
						{(!lastEditByUser && lastEditUser) && 
							<SingleLineOverflow text={"Sist redigert av " + lastEditUserDisplayName} />
						}
					</p>
				</span>
			</a>
		</Link>
	)
}

export default CalendarItem