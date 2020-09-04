import Layout from "app/layouts/ArticleLayout"

export const PrivacyPage = () => (
  <div className="priv-container">
    <h1>Personvern</h1>
    <p>
      Denne personvernerklæringen gjelder for dinadvent.no, heretter benevnt som
      Behandlingsansvarlig.
    </p>
    <p>
      Erklæringen gir informasjon om databehandling utført av Behandlingsansvarlig og bestemmer
      formålet og virkemidlene for behandlingen samt databehandling vi gjør på vegne av våre kunder
      basert på deres instruksjoner.
    </p>
    <p>
      Behandling av personlige data er nødvendig for at vi skal kunne levere vår tjeneste og betjene
      deg som kunde.
    </p>
    <p>
      Ved å gi oss dine personlige opplysninger, godtar du praksis og vilkår som er beskrevet i
      denne personvernerklæringen.
    </p>
    <p>
      Om du har innsigelser med hensyn til vår behandling av personvern har du også anledning å
      klage til Datatilsynet.
    </p>

    <h2>Behandlingsansvarlig</h2>
    <p>
      WEBAWESOME SIGURD M WAHL
      <br />
      Hans Hansens vei 176
      <br />
      Drammen
      <br />
      E-post: dinadvent@gmail.com
      <br />
      Personvernombud: E-post: dinadvent@gmail.com Telefon: +47 911 28 859
    </p>

    <h2>Underleverandører</h2>
    <p>
      Behandlingsansvarlig benytter seg også av tjenester levert av 3. Part. Her er en oversikt over
      underleverandører hvor informasjon kan lagres
    </p>

    <h2>Innsyn og retting</h2>
    <p>
      Du har krav på innsyn i de opplysninger som er registrert om deg. Innsyn kan også fås ved å
      sende en henvendelse til privacy@gdpr.no. Dersom de registrerte opplysninger ikke er riktige
      eller er ufullstendige, kan du kreve at opplysningene korrigeres i henhold til
      personopplysningsloven.
    </p>

    <h2>Oppbevaring og sletting</h2>
    <p>Alle data i tjenesten slettes etter 31.12.2019.</p>

    <h2>Informasjon om bruk av informasjonskapsler.</h2>
    <p>
      En informasjonskapsel (cookie) er en liten tekstfil som lagres på din datamaskin. Vi bruker
      informasjonskapsler blant annet til å huske din innlogging, til å samle tilbakemelding og som
      en del av vår markedsføring.
    </p>

    <p>
      Når du besøker våre tjenester, setter vi både midlertidige og varige informasjonskapsler. En
      midlertidig informasjonskapsel slettes ofte automatisk når du lukker nettleseren din, mens
      varige kan ligge på din maskin i opptil ett år. Om du ønsker å lære mer om informasjonskapsler
      kan http://www.aboutcookies.org benyttes.
    </p>

    <h2>Følgende informasjonskapsler er i bruk i våre tjenester</h2>

    <h3>Bruk av nettside</h3>
    <p>
      Vi benytter informasjonskapsler til blant annet å huske deg som kunde. Uten
      informasjonskapsler vil ikke en bruker kunne logge inn.
    </p>

    <h3>Stripe Checkout</h3>
    <p>
      Vi benytter Stipe Checkout som vår betalingsløsning. Se mer informasjon om hvordan de bruker
      informasjonskapsler her:{" "}
      <a href="https://stripe.com/cookies-policy/legal">https://stripe.com/cookies-policy/legal</a>
    </p>

    <h3>Google Analytics</h3>
    <p>Google Analytics benytter informasjonskapsler for analyse av trafikk.</p>

    <h2>Samtykke i bruk av informasjonskapsler</h2>
    <p>
      I henhold til norsk lov har du automatisk samtykket i at vi lagrer informasjonskapsler på din
      datamaskin dersom du tillater dette gjennom innstillingene i din nettleser.
    </p>
  </div>
)

PrivacyPage.getLayout = (page) => <Layout title="Personvern - Din Advent">{page}</Layout>

export default PrivacyPage
