import Layout from "app/layouts/ArticleLayout"

// thanks to https://webdesign.no/gdpr/
export const PrivacyPage = () => (
	<div className="priv-container">
		<h1>Cookies</h1>
		<h2>Informasjon om bruk av informasjonskapsler</h2>
		<p>En informasjonskapsel (cookie) er en liten tekstfil som lagres på din datamaskin. Vi bruker informasjonskapsler blant annet til å huske din innlogging, til å samle tilbakemelding og som en del av vår markedsføring.</p>
		<p>Når du besøker våre tjenester, setter vi både midlertidige og varige informasjonskapsler. En midlertidig informasjonskapsel slettes ofte automatisk når du lukker nettleseren din, mens varige kan ligge på din maskin i opptil ett år. Om du ønsker å lære mer om informasjonskapsler kan http://www.aboutcookies.org benyttes.</p>

		<h3>Følgende informasjonskapsler er i bruk i våre tjenester</h3>
		<h4>Bruk av nettside</h4>
		<p>Vi benytter informasjonskapsler til blant annet å huske deg som kunde. Uten informasjonskapsler vil ikke en bruker kunne logge inn.</p>

		<h3>Eksterne tjenester</h3>
		<h4>Stripe Checkout</h4>
		<p>Vi benytter Stipe Checkout som vår betalingsløsning. <a href="https://stripe.com/cookies-policy/legal">Se mer informasjon om hvordan de bruker informasjonskapsler.</a></p>

		<h4>Cloudinary</h4>
		<p>Vi benytter Cloudinary til å servere bilder i tjenesten. Når du laster opp et bilde i en kalender, lagres dette i Cloudinary sin tjeneste. <a href="https://cloudinary.com/privacy">Les mer om personvern hos Cloudinary.</a></p>

		<h4>Google Analytics</h4>
		<p>Vi benytter Google Analytics til å få informasjon om bruken av tjenesten, analyse av trafikk og til andre analytiske formål.</p>

		<h2>Samtykke i bruk av informasjonskapsler</h2>
		<p>I henhold til norsk lov har du automatisk samtykket i at vi lagrer informasjonskapsler på din datamaskin dersom du tillater dette gjennom innstillingene i din nettleser.</p>
	</div>
)

PrivacyPage.getLayout = (page) => <Layout title="Personvern - Din Advent">{page}</Layout>

export default PrivacyPage