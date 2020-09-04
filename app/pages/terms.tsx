import Layout from "app/layouts/ArticleLayout"

export const TermsPage = () => (
  <div>
    <h1>Vilkår</h1>
    <p>
      <h2>Registrering og betaling</h2>
      Ved å registrere deg på Din Advent får du tilgang til å lage opptil 25 kalendere. For å
      benytte "dele kalender" funksjonaliteten betaler du en pris på 49 NOK. Betaling kan gjøres
      inne på de innloggede sidene.
    </p>
    <p>
      <h2>Tilgjengelighet</h2>
      Alle produserte kalendere vil være tilgjengelig frem til og med 31. desember 2019. Etter denne
      datoen slettes alt innhold permanent. Sørg derfor på å hente ut ditt innhold før denne datoen
      dersom du ønsker å ta vare på dette.
    </p>
    <p>
      <h2>Innhold</h2>
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
