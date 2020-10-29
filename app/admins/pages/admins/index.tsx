import React from "react"
import { Link, BlitzPage } from "blitz"
import ArticleLayout from "app/layouts/ArticleLayout"

const AdminsPage: BlitzPage = () => {
	return (
		<div>
			<h1>Admins</h1>
			<ul>
				<li>
					<Link href="/admins/new">
						<a>Lag ny admin</a>
					</Link>
				</li>
				<li>
					<Link href="/admins/payment">
						<a>Håndter betaling</a>
					</Link>
				</li>
				<li>
					<Link href="/admins/userinfo">
						<a>Få brukerinfo</a>
					</Link>
				</li>
				<li>
					<Link href="/admins/statistics">
						<a>Statistikk</a>
					</Link>
				</li>
				
			</ul>
		</div>
	)
}

AdminsPage.getLayout = (page) => <ArticleLayout title={"Admins"}>{page}</ArticleLayout>

export default AdminsPage
