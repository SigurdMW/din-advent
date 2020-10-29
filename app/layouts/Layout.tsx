import { Head, Link } from "blitz"
import Navigation from "./Navigation"

const GAKey = process.env.NEXT_PUBLIC_GA_KEY

const Layout = ({ title, children, hideHeader = false }) => (
	<>
		<Head>
			<title>{title || "Din Advent"}</title>
			<meta charSet="utf-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width,initial-scale=1.0" />
			<link
				href="https://fonts.googleapis.com/css?family=Roboto:400,900,900i&display=swap"
				rel="stylesheet"
			/>
			<link rel="icon" href="/favicons/favicon.ico" />
			<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
			<link rel="manifest" href="/favicons/site.webmanifest" />
			<meta name="msapplication-TileColor" content="#da532c" />
			<meta name="theme-color" content="#361067" />
			<meta property="og:title" content={title || "Din Advent - Digital julekalender"} />
			<meta
				property="og:image"
				content="/devices.png"
			/>
			<meta
				property="og:description"
				content="Med Din Advent kan du gi noen du bryr deg om en spennende adventstid. Opprett gratis bruker i dag for å komme i gang! Skulle du like tjenesten, kan du se hvilken pakke som passer deg."
			/>
			<meta property="og:type" content="website" />
			{GAKey && (
				<>
					<script async src={"https://www.googletagmanager.com/gtag/js?id=" + GAKey}></script>
					<script>{`
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', '${GAKey}');
			`}</script>
				</>
			)}
		</Head>

		<div className="site">
			{!hideHeader && <Navigation />}
			<main className="site-content">{children}</main>
			<div className="da-footer">
				<div>
					<Link href="/privacy">Personvern</Link> | <Link href="/terms">Vilkår</Link> | <Link href="/cookies">Cookies</Link> |{" "}
					<Link href="/about">Om oss</Link> | <Link href="/contact">Kontakt & tilbakemelding</Link>
				</div>
				<div className="da-footer-trademark">Made with ❤ in Drammen</div>
			</div>
		</div>
	</>
)

export default Layout
