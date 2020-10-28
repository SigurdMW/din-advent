import Layout from "app/layouts/ArticleLayout"

// thanks to https://webdesign.no/gdpr/
export const PrivacyPage = () => (
	<div className="priv-container">
		<h1>Personvernerklæring for dinadvent.no</h1>

		<p>
      Denne personvernerklæringen gjelder for dinadvent.no, heretter benevnt som
      Behandlingsansvarlig. Erklæringen gir informasjon om databehandling utført av Behandlingsansvarlig og bestemmer
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

		<h2>1. Behandlingsansvarlig</h2>
		<p>Sigurd Moland Wahl (e-post: sigurdmwahl@gmail.com, telefon: +47 911 28 859) er på vegne av dinadvent.no behandlingsansvarlig for selskapets behandling av personopplysninger.</p>

		<h2>2. Personopplysninger som lagres</h2>
		<p>Vi lagrer følgende personopplysninger om våre kunder: <br/>
		E-postadresse og (valgfritt) navn<br/>
		Vi lagrer i tillegg kjøpshistorikk og adferdsmønster på vår nettside, dvs. opplysninger om hvordan den enkelte kunde navigerer på siden.</p>

		<h2>3. Formål med behandlingen</h2>
		<p>Vi behandler opplysningene for å kunne gjennomføre våre forpliktelser etter avtale med deg.</p>

		<h2>4. Grunnlaget for behandlingen</h2>
		<p>Informasjon om navn og e-postadresse benyttes for å oppfylle kjøpsavtalen. Grunnlaget for denne behandlingen er personvernforordningens artikkel Art 6 (b).</p>

		<h2>5. Innhenting av personopplysninger</h2>
		<p>Vi lagrer de personopplysningene du har avgitt på våre nettsider. Vi bruker informasjonskapsler/cookies på våre nettsider for å gi deg som besøker siden best kundeopplevelse og service. Lov om elektronisk kommunikasjon krever at vi informerer våre besøkende om bruk av informasjonskapsler (cookies).</p>

		<h2>6. Utlevering av opplysninger til tredjeparter</h2>
		<p>Vi vil ikke dele, selge, overføre eller på annen måte utlevere personopplysninger til andre, med mindre vi er rettslig forpliktet til det.</p>

		<h2>7. Sletting av personopplysninger</h2>
		<p>Opplysninger vi har mottatt i forbindelse med ditt kjøp lagres i vårt aktive kunderegister i 5 år.</p>

		<h2>8. Rettigheter for den registrerte</h2>
		<p>Vi behandler dine personopplysninger i henhold til personopplysningsloven og gjeldende forskrifter. Det gjøres oppmerksom på at du kan kreve innsyn i og flytting av egne personopplysninger, samt kreve retting eller sletting av opplysninger. Det kan klages til Datatilsynet på behandling i strid med reglene.</p>

		<h2>9. Personvernombud</h2>
		<p>Vi har et personvernombud, Sigurd Moland Wahl, som påser at personopplysningslovens regler om behandling av personopplysninger blir fulgt.</p>

		<h2>10. Informasjonssikkerhet</h2>
		<p>Vi sikrer dine personopplysninger ved virtuell adgangs- og tilgangskontroll. Strategien vår er å hente inn så lite data som mulig - vi ber deg ikke om mer data enn det vi må ha for å kunne tilby tjenesten. Vi lagrer ikke passort eller andre sensitive opplysninger.</p>

		<h2>Kontaktinformasjon</h2>
		<p>Henvendelser om hvilke opplysninger som er registrert, retting og sletting kan sende skriftlig til følgende adresser:<br/>
		Sigurd Moland Wahl<br />
		WEBAWESOME SIGURD M WAHL<br />
		Org.nr. 913 302 540<br/>
		Hans Hansens vei 176<br/> 
		3022 Drammen<br/>
		Norge</p>
	</div>
)

PrivacyPage.getLayout = (page) => <Layout title="Personvern - Din Advent">{page}</Layout>

export default PrivacyPage
