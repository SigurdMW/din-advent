import React, { Suspense, useEffect, useState } from "react"
import { Link, useQuery, BlitzPage, useSession } from "blitz"
import getCalendars from "app/calendars/queries/getCalendars"
import classes from "./calendar.module.scss"
import Spinner from "app/components/Spinner"
import HeroBanner from "app/components/HeroBanner"
import FullWidthLayout from "app/layouts/FullWidthLayout"
import Container from "app/components/Container"
import CalendarItem from "app/calendars/components/CalendarItem"
import WhiteSection from "app/calendars/components/WhiteSection"
import Button from "app/components/Button"

type FilterType = "" | "createdbyme" | "sharedwithme"

export const CalendarsList = () => {
	const [calendars, { refetch }] = useQuery(getCalendars, { orderBy: { updatedAt: "desc" } })
	const [filter, setFilter] = useState<FilterType>("")
	const session = useSession()
	const userId = session.userId
	const showCreatedByMe = filter === "createdbyme"

	useEffect(() => {
		let timer;
		try {
			const time = 1000 * 60 * 1 // refetch every 1 minutes
			timer = setInterval(refetch, time)
		} catch (e) {
			// do nothing
		}
		return () => {
			if (timer) clearInterval(timer)
		}
	}, [])

	return (
		<WhiteSection>
			<Container>
				<div style={{ display: "flex", alignItems: "center" }}>
					<h2 style={{ display: "flex", flexGrow: 1 }}>Dine kalendere</h2>
					{calendars.length > 1 &&
						<select onChange={(e) => setFilter(e.target.value as FilterType)} style={{ width: "auto" }} className="select--small">
							<option value="">Vis alle</option>
							<option value="createdbyme">Laget av meg</option>
							<option value="sharedwithme">Delt med meg</option>
						</select>
					}
				</div>
				{calendars.length ? (
					<div style={{ overflowX: "hidden" }}>
						<ul className={classes.list}>
							{calendars.filter((c) => filter ? showCreatedByMe ? c.userId === userId : c.userId !== userId : true).map((calendar) => (
								<li className={classes.listItem} key={calendar.id}>
									<CalendarItem calendar={calendar} userId={userId} />
								</li>
							))}
						</ul>
					</div>
				) : (
					<p>
						Du har ingen kalendere ennå.{" "}<br/><br/>
						<Link href="/calendars/new" passHref>
							<Button type="primary" anchor={true}>Opprett kalender</Button>
						</Link>
					</p>
				)}
			</Container>
		</WhiteSection>
	)
}

const CalendarsPage: BlitzPage = () => (
	<>
		<HeroBanner>
			<h1>Dine kalendere</h1>
			<p>Lag en ny kalender eller se kalendere som du har tilgang til her.</p>
			<br/>
			<Link href="/calendars/new" passHref>
				<Button type="green" anchor={true}>Ny kalender</Button>				
			</Link>
		</HeroBanner>

		<Suspense fallback={<Spinner />}>
			<CalendarsList />
		</Suspense>
	</>
)

CalendarsPage.getLayout = (page) => (
	<FullWidthLayout title="Dine kalendere - Din Advent">{page}</FullWidthLayout>
)

export default CalendarsPage
