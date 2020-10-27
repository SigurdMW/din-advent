import Layout from "app/layouts/ArticleLayout"

export const ContactPage = () => (
	<div>
		<h1>Kontakt og tilbakemelding</h1>
		<p>
      Vi håper du er fornøyd med tjenesten. Dersom du har tilbakemelding, ønsker om nye funksjoner
      eller har oppdaget en feil du ønkser å melde fra om, kan du sende oss en e-post til{" "}
			<strong>dinadvent@gmail.com</strong> eller på{" "}
			<a href="https://www.facebook.com/dinadvent/">vår facebookside</a>. Vi forsøker å svare på
      alle henvendelser innen 24 timer.
		</p>
	</div>
)

ContactPage.getLayout = (page) => <Layout title="Kontakt - Din Advent">{page}</Layout>

export default ContactPage
