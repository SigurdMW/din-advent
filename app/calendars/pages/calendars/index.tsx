import React, { Suspense } from "react"
import { Link, BlitzPage } from "blitz"
import Spinner from "app/components/Spinner"
import HeroBanner from "app/components/HeroBanner"
import FullWidthLayout from "app/layouts/FullWidthLayout"
import Button from "app/components/Button"
import CalendarList from "app/calendars/components/CalendarList"

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
			<CalendarList />
		</Suspense>
	</>
)

CalendarsPage.getLayout = (page) => (
	<FullWidthLayout title="Dine kalendere - Din Advent">{page}</FullWidthLayout>
)

export default CalendarsPage
