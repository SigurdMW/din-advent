import Layout from "app/layouts/ArticleLayout"
import classes from "./about.module.scss"

export const AboutPage = () => (
	<>
		<h1>Om oss</h1>
		<p>Din Advent er en alternativ julekalender som laget for deg som ønsker å gi noen en magisk advent. Menneskene bak Din Advent har troen på at alle små ting hjelper når det gjelder å bidra til miljøet. Derfor ønsket vi å lage en digital julekalender som sparer både tid, penger og miljø.</p>
		<p>Vi håper du er fornøyd med tjenesten og at den bidrar til å spre adventsglede til folket. Dersom du har noen spørsmål eller tilbakemeldinger om julekalendere kan du ta kontakt på <strong>dinadvent@gmail.com</strong> eller <a href="https://www.facebook.com/dinadvent/">vår facebookside</a>.</p>
		<p>Ha en riktig god advent!</p>
		<div className={classes.overflow}>
			<div className={classes.us}>
				<div className={classes.col}>
					<img src="/robin.jpg" alt="Robin - vår designer" />
					Robin, design
				</div>
				<div className={classes.col}>
					<img src="nils.jpg" alt="Nils - vår tester, markedsfører og altmuligmann" />
					Nils, test og markedsføring
				</div>
				<div className={classes.col}>
					<img src="sigurd.jpg" alt="Sigurd - vår utvikler" />
					Sigurd, utvikler
				</div>
			</div>
		</div>
	</>
)

AboutPage.getLayout = (page) => <Layout title="Om oss - Din Advent">{page}</Layout>

export default AboutPage
