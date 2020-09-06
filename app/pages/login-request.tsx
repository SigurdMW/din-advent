import Layout from "app/layouts/ArticleLayout"

export const LoginRequest = () => (
  <div>
    <h1>Sjekk e-posten din!</h1>
    <p>Vi har nå sendt deg en e-post med en link du kan bruke for å logge deg inn.</p>
    <p>Ikke mottatt e-post?</p>
    <p>Følgende feil kan ha skjedd:</p>
    <ul>
      <li>E-posten ligger i søppelpost</li>
      <li>E-posten har ikke rukket å komme frem enda</li>
      <li>Du har skrevet feil e-postadresse</li>
      <li>Du har ingen bruker på dinadvent.no</li>
    </ul>
  </div>
)

LoginRequest.getLayout = (page) => (
  <Layout title="Innloggingsforespørsel - Din Advent">{page}</Layout>
)

export default LoginRequest
