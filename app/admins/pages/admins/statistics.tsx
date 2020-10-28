import React, { Suspense } from "react"
import { BlitzPage, Link, useQuery } from "blitz"
import ArticleLayout from "app/layouts/ArticleLayout"
import Spinner from "app/components/Spinner"
import getNumberOfUsers from "app/admins/queries/getNumberOfUsers"
import getNumberOfCalendars from "app/admins/queries/getNumberOfCalendars"
import getNumberOfPayments from "app/admins/queries/getNumberOfPayments"

const Statistics = () => {
	const [number] = useQuery(getNumberOfUsers, {})
	const [calendars] = useQuery(getNumberOfCalendars, {})
	const [{ paymentsNumber, completedNumber }] = useQuery(getNumberOfPayments, {})

	return (
		<div>
			<p>Statistikk kommer her:</p>
			<ul>
				<li>Antall brukere: {number}</li>
				<li>Antall kalendere: {calendars} </li>
				<li>Antall betalinger: {paymentsNumber}</li>
				<li>Antall betalinger bekreftet: {completedNumber}</li>
			</ul>
		</div>
	)
}

const AdminStatistics: BlitzPage = () => {
	return (
		<div>
			<h1>Statistikk</h1>
			<Suspense fallback={<Spinner />}>
				<Statistics />
			</Suspense>
			<p>
				<Link href="/admins">
					<a>Tilbake til admin-side</a>
				</Link>
			</p>
		</div>
	)
}

AdminStatistics.getLayout = (page) => <ArticleLayout title="Statistikk">{page}</ArticleLayout>

export default AdminStatistics
