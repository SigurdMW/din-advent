import Layout from "app/layouts/ArticleLayout"
import { Link } from "blitz"

export const TermsPage = () => (
  <div>
    <h1>Vilkår</h1>
    <h2>Registrering og betaling</h2>
    <p>
      Det er gratis å opprette bruker på Din Advent. For å dele kalendere du har laget, må du kjøpe
      en av våre pakker.{" "}
      <Link href="/pricing">
        <a>Se hvilke pakker som er tilgjengelige og hva de koster her</a>
      </Link>
    </p>
    <h2>Tilgjengelighet</h2>
    <p>
      Kalenderne som legges inn er tilgjengelige i løsningen til 31.12.2020. Etter dette slettes
      kalendere for godt.{" "}
    </p>
    <h2>Innhold</h2>
    <p>
      Som bruker av denne tjenesten er du selv ansvarlig for innholdet som du legger inn. Alt av
      innhold som legges inn i en kalender må du regne med at kan sees av alle da kalenderene er
      enkle å distribuere. Følg derfor fornuftig nettvett, og legg ikke inn sensitivt innhold eller
      utlever personopplysninger. Innhold som er av sjikanerende eller pornografisk karakter vil bli
      slettet. Eksempler på innhold er tekst, bilder og video.
    </p>
  </div>
)

TermsPage.getLayout = (page) => <Layout title="Vilkår - Din Advent">{page}</Layout>

export default TermsPage
