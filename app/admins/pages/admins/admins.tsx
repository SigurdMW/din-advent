import React, { Suspense } from "react"
import { Link, BlitzPage, useQuery } from "blitz"
import ArticleLayout from "app/layouts/ArticleLayout"
import Spinner from "app/components/Spinner"
import getAdminList from "app/admins/queries/getAdminList"

const AdminList = () => {
	const [admins] = useQuery(getAdminList, {})

	return (
		<table>
			<thead>
				<tr>
					<th>Email</th>
					<th>Navn</th>
					<th>ID</th>
				</tr>
			</thead>
			<tbody>
				{admins.map((u) => (
					<tr key={u.id}>
						<td>{u.email}</td>
						<td>{u.name || "Ingen navn angitt"}</td>
						<td>{u.id}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

const AdminsPage: BlitzPage = () => {
	return (
		<div>
			<h1>Liste over admins</h1>
			<p>Her er alle admins som er registrert:</p>
			<Suspense fallback={<Spinner />}>
				<AdminList />
			</Suspense>
			<p>
				<Link href="/admins">
					<a>Tilbake til admin-side</a>
				</Link>
			</p>
		</div>
	)
}

AdminsPage.getLayout = (page) => <ArticleLayout title={"Admins"}>{page}</ArticleLayout>

export default AdminsPage
