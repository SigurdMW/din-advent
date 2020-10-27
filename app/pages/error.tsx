import React from "react"
import { BlitzPage, Link } from "blitz"
import ArticleLayout from "app/layouts/ArticleLayout"

const ErrorPage: BlitzPage = () => (
	<div>
		<h1>Noe gikk galt 😥</h1>
		<p>
      Vi klarte dessverre ikke å logge deg inn denne gangen. Feilen har blitt logget og vil bli
      undersøkt.
		</p>
		<Link href="/login">
			<a>Til innlogging</a>
		</Link>
	</div>
)

ErrorPage.getLayout = (page) => (
	<ArticleLayout title="Innlogging feilet - Din Advent">{page}</ArticleLayout>
)

export default ErrorPage
