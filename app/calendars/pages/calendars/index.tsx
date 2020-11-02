import React, { Suspense, useState } from "react"
import { Link, useQuery, BlitzPage, useSession } from "blitz"
import getCalendars from "app/calendars/queries/getCalendars"
import AuthLayout from "app/layouts/AuthLayout"
import classes from "./calendar.module.scss"
import Spinner from "app/components/Spinner"

const ShareIcon = (
	<svg x="0px" y="0px" viewBox="0 0 512 512">
		<path fill="#ccc" d="M406,332c-29.641,0-55.761,14.581-72.167,36.755L191.99,296.124c2.355-8.027,4.01-16.346,4.01-25.124
			c0-11.906-2.441-23.225-6.658-33.636l148.445-89.328C354.307,167.424,378.589,180,406,180c49.629,0,90-40.371,90-90
			c0-49.629-40.371-90-90-90c-49.629,0-90,40.371-90,90c0,11.437,2.355,22.286,6.262,32.358l-148.887,89.59
			C156.869,193.136,132.937,181,106,181c-49.629,0-90,40.371-90,90c0,49.629,40.371,90,90,90c30.13,0,56.691-15.009,73.035-37.806
			l141.376,72.395C317.807,403.995,316,412.75,316,422c0,49.629,40.371,90,90,90c49.629,0,90-40.371,90-90
			C496,372.371,455.629,332,406,332z"/>
	</svg>
)

const CalendarItem = ({ calendar, userId }) => {
	const createdByMe = userId === calendar.userId
	const emailFirstPart = calendar.user.email.split("@")[0]
	const displayName = calendar.user.name || emailFirstPart
	return (
		<li key={calendar.id} className={classes.listItem}>
			<Link href="/calendars/[calendarId]" as={`/calendars/${calendar.id}`}>
				<a className={classes.calendarItem}>
					<h2 title={calendar.name}>{calendar.name}</h2>
					{!createdByMe && <div className={classes.itemSvg} title={"Kalender delt med deg av " + displayName}>{ShareIcon}</div>}
					<p>
			Laget av <span>{createdByMe ? "deg " : displayName}</span>{" "}
						{new Date(calendar.createdAt.toString()).toLocaleDateString()}
					</p>
					<span className={"da-button da-golden-btn "+classes.span}>Gå til kalender</span>
				</a>
			</Link>
		</li>
	)
}

type FilterType = "" | "createdbyme" | "sharedwithme"

export const CalendarsList = () => {
	const [calendars] = useQuery(getCalendars, { orderBy: { id: "desc" } })
	const [filter, setFilter] = useState<FilterType>("")
	const session = useSession()
	const userId = session.userId
	const showCreatedByMe = filter === "createdbyme"

	return (
		<>
			{calendars.length ? (
				<>
					<hr className="da-divider" />
					<div style={{ display: "flex", alignItems: "center" }}>
						<p style={{ display: "flex", flexGrow: 1 }}>Dine kalendere:</p>
						{calendars.length > 1 &&
							<select onChange={(e) => setFilter(e.target.value as FilterType)} style={{ width: "auto" }} className="select--small">
								<option value="">Vis alle</option>
								<option value="createdbyme">Laget av meg</option>
								<option value="sharedwithme">Delt med meg</option>
							</select>
						}
					</div>
					<ul className={classes.list}>
						{calendars.filter((c) => filter ? showCreatedByMe ? c.userId === userId : c.userId !== userId : true).map((calendar) => (
							<CalendarItem calendar={calendar} userId={userId} key={calendar.id} />
						))}
					</ul>
				</>
			) : (
				<p>
          			Du har ingen kalendere ennå.{" "}
					<Link href="/calendars/new">
						<a>Opprett kalender</a>
					</Link>
				</p>
			)}
		</>
	)
}

const CalendarsPage: BlitzPage = () => (
	<>
		<h1>Dine kalendere</h1>

		<p>
			<Link href="/calendars/new">
				<a className="da-button da-btn-large da-golden-btn">Opprett kalender</a>
			</Link>
		</p>

		<Suspense fallback={<Spinner />}>
			<CalendarsList />
		</Suspense>
	</>
)

CalendarsPage.getLayout = (page) => (
	<AuthLayout title="Dine kalendere - Din Advent">{page}</AuthLayout>
)

export default CalendarsPage
