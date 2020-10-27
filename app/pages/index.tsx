import { Link, BlitzPage } from "blitz"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Suspense } from "react"
import ArticleLayout from "app/layouts/ArticleLayout"
import classes from "./index.module.scss"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */
const AnonAction = ({ text = "Sett i gang" }) => (
	<Link href="/signup">
		<a className="da-button da-btn-large da-golden-btn">{text}</a>
	</Link>
)
const CTAButton = () => {
	const { user } = useCurrentUser()

	if (user) {
		return (
			<Link href="/calendars">
				<a className="da-button da-btn-large da-golden-btn">Gå til dine kalendere</a>
			</Link>
		)
	} else {
		return <AnonAction />
	}
}

const Home: BlitzPage = () => (
	<div>
		<div className={classes.section}>
			<div className={classes.hero}>
				<div className={classes.heroImage}>
					<img src="devices.png" alt="stearinlys og julestemning" />
				</div>
				<div className={classes.heroContent}>
					<div className="hero-text">
						<div className="hero-actions">
							<h1>Digital julekalender</h1>
							<p>
                Med Din Advent kan du gi noen du bryr deg om en spennende adventstid. Opprett gratis
                bruker i dag for å komme i gang! Skulle du like tjenesten, kan du
								<Link href="/pricing">
									<a className="button small">&nbsp;se hvilke pakke som passer deg.</a>
								</Link>
							</p>
							<Suspense fallback={<AnonAction />}>
								<CTAButton />
							</Suspense>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div className={classes.smallSection}>
			<div>
				<h2>Slik fungerer det</h2>
				<div className={classes.row}>
					<div>
						{/* <img
							src="https://cdn.sanity.io/images/82cwwg7j/production/67c2318a868a195ea449b00687aa385fea0c15da-1357x1072.png?w=400"
							alt="Lag en kalender"
						/> */}
						<div className={classes.explainer}>
							<div className="explainer-step">
								<span>1</span>
							</div>
							<h3>Opprett en kalender</h3>
							<p>
                Lag en kalender til noen du vil gjøre noe hyggelig for. Du kan lage en kalender til
                hvem som helst, være seg en ektefelle, venn, en i familien eller noen helt andre.
							</p>
						</div>
					</div>
					<div>
						{/* <img
							src="https://cdn.sanity.io/images/82cwwg7j/production/9f572e73d2b972bdf630ad22133eae7557a7627a-1359x1070.png?w=400"
							alt="Legg inn innhold"
						/> */}
						<div className={classes.explainer}>
							<div className="explainer-step">
								<span>2</span>
							</div>
							<h3>Legg til innhold</h3>
							<p>
                Du legger til innhold i kalenderen i vårt intuitive grensesnitt. Du kan legge inn
                bilder, tekst, linker, videoer, og mye mer i hver kalenderluke.
							</p>
						</div>
					</div>
					<div>
						{/* <img
							src="https://cdn.sanity.io/images/82cwwg7j/production/ac52cddd37c802723bd98796678d608d5291f0a4-1360x1069.png?w=400"
							alt="Del kalenderen"
						/> */}
						<div className={classes.explainer}>
							<div>
								<span>3</span>
							</div>
							<h3>Del kalenderen</h3>
							<p>
                Du kan når som helst dele kalenderen ved hjelp av en delingslink som blir
                tilgjengelig etter betaling. Denne linken kan du dele med en eller flere personer.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		{/* <div className={classes.section}>
			<h2>Trenger du inspirasjon?</h2>
			<p>
			Vi har laget flere kalendere du kan bruke for inspirasjon.
			</p>
		</div> */}

		<div className={classes.smallSection}>
			<div>
				<h2>Informasjon og tips</h2>
				<div className={classes.row}>
					<div>
						<img src="../icons/clock.svg" alt="" width="48px" />
						<p>
              Lag kalenderen underveis i desember. Start med de første lukene, og lag resten
              fortløpende under adventstiden.
						</p>
					</div>
					<div>
						<img src="../icons/pen.svg" alt="" width="48px" />
						<p>
              Gjør endringer i sanntid på julekalenderen gjennom hele adventstiden selv om
              kalenderen allerede er delt med mottaker.
						</p>
					</div>

					<div>
						<img src="../icons/lock.svg" alt="" width="48px" />
						<p>
              Mottakere kan kun åpne luker frem til og med dagens dato, og de vil alltid se siste
              oppdaterte endringer som du har lagt inn.
						</p>
					</div>
					{/* <div>
						<img src="../icons/date.svg" alt="" />
						<p>Alle kalendere vil være tilgjengelig helt frem til 31.desember 2020.</p>
					</div> */}
				</div>
			</div>
		</div>

		<div className={classes.smallSection}>
			<div>
				<p>Klar til å sette i gang?</p>
				<AnonAction text="Opprett bruker" />
			</div>
		</div>
	</div>
)

Home.getLayout = (page) => <ArticleLayout title="Forside - Din Advent">{page}</ArticleLayout>

export default Home
