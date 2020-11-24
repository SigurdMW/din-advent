import Layout from "app/layouts/ArticleLayout"
import { Link } from "blitz"

// more info https://www.forbrukertilsynet.no/digitalevilkar
export const TermsPage = () => (
	<div>
		<h1>Vilkår</h1>
		<h2>Registrering og betaling</h2>
		<p>
      Det er gratis å opprette bruker på Din Advent. For å dele en kalender du har laget, må du kjøpe
      en av våre pakker.{" "}
			<Link href="/pricing">
				<a>Se hvilke pakker som er tilgjengelige og hva de koster her</a>
			</Link>
		</p>
		<h2>Varighet</h2>
		<p>
      Når du kjøper en pakke fra oss, kjøper du en pakke som varer til og med 31.12.2020. Dersom du
      ønsker å benytte tjenesten i 2021, må du kjøpe en ny pakke neste år.
		</p>
		<h2>Tilgjengelighet</h2>
		<p>Når du kjøper en pakke fra oss, forplikter vi oss til å holde tjenesten tilgjengelig fra den datoen du gjennomfører kjøpet og til og med 31.12.2020. Når du kjøper en pakke, får du umiddelbart tilgang til å begynne å bruke tjenesten.</p>
		<h2>Innhold</h2>
		<p>
		Som bruker av denne tjenesten er du selv ansvarlig for innholdet som du legger inn. Alt av
		innhold som legges inn i en kalender må du regne som offentlig tilgjengelig. Følg derfor
		fornuftig nettvett, og legg ikke inn sensitivt innhold eller utlever personopplysninger.
		Innhold som er av sjikanerende eller pornografisk karakter vil bli slettet. Eksempler på
		innhold i denne sammenhengen er tekst, bilder og video som du legger inn i tjenesten.
		</p>
		<h2>Angrerett og reklamasjon</h2>
		<p>Det er i utgangspunktet ikke noen angrerett på tjenester av denne sorten. <Link href="/contact"><a>Har du spørsmål om reklamasjon og angrerett, ta kontakt.</a></Link></p>
	</div>
)

TermsPage.getLayout = (page) => <Layout title="Vilkår for bruk - Din Advent">{page}</Layout>

export default TermsPage
