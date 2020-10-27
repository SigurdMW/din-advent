import Layout from "app/layouts/ArticleLayout"
import { useRouterQuery } from "blitz"

export const LoginRequest = () => {
	const query = useRouterQuery()
	return (
		<div>
			<h1>Sjekk e-posten din!</h1>
			<p>
        Vi har sendt en e-post {query.email ? " til " + query.email : ""} med en link du kan bruke
        for å logge deg inn.
			</p>
			<p>Ikke mottatt e-post?</p>
			<p>Følgende kan være grunnen:</p>
			<ul>
				<li>E-posten ligger i søppelpost</li>
				<li>E-posten bruker litt tid og har ikke kommet frem enda</li>
				<li>Du har skrevet feil e-postadresse</li>
				<li>Du har ingen bruker på dinadvent.no</li>
			</ul>
		</div>
	)
}

LoginRequest.getLayout = (page) => (
	<Layout title="Innloggingsforespørsel - Din Advent">{page}</Layout>
)

export default LoginRequest
