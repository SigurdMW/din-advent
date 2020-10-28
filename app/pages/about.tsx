import Layout from "app/layouts/ArticleLayout"

export const AboutPage = () => (
	<>
		<h1>Om Oss</h1>
		<div>
      Din Advent er en alternativ kalender laget for deg som ønsker å gi noen en spesiell advent
      uten å måtte kjøpe unødvendige ting. Da sparer man samtidig miljøet. Menneskene bak Din Advent
      har troen på at alle små ting hjelper når det gjelder å bidra til miljøet. Derfor ønsket vi å
      lage en digital julekalender som sparer både tid, penger og miljø.
		</div>
		<div>
      Vi håper du er fornøyd med tjenesten og at den bidrar til å spre adventsglede til alle
      mottakere. Dersom du har noen spørsmål eller tilbakemeldinger om julekalendere kan du ta
      kontakt på <strong>dinadvent@gmail.com</strong> eller{" "}
			<a href="https://www.facebook.com/dinadvent/">vår facebookside</a>.
		</div>
		<div>Ha en riktig god advent!</div>
	</>
)

AboutPage.getLayout = (page) => <Layout title="Om oss">{page}</Layout>

export default AboutPage
