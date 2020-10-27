import { Head, Link } from "blitz"
import Navigation from "./Navigation"

const GAKey = process.env.NEXT_PUBLIC_GA_KEY

const Layout = ({ title, children }) => (
	<>
		<Head>
			<title>{title || "Din Advent"}</title>
			<link rel="icon" href="/favicon.ico" />
			<meta charSet="utf-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width,initial-scale=1.0" />
			<link
				rel="stylesheet"
				href="https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css"
				media="all"
			/>
			<link
				href="https://fonts.googleapis.com/css?family=Lobster|Roboto:400,900,900i&display=swap"
				rel="stylesheet"
			/>
			<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
			<link rel="manifest" href="/favicons/site.webmanifest" />
			<meta name="msapplication-TileColor" content="#da532c" />
			<meta name="theme-color" content="#512B84" />
			<meta property="og:title" content={title || "Din Advent - Digital julekalender"} />
			{/* <meta
        property="og:image"
        content="https://cdn.sanity.io/images/82cwwg7j/production/f9d39ef9172bfed82eeb82a42892ee9f881c887e-600x600.png"
      /> */}
			<meta
				property="og:description"
				content="Med Din Advent kan du opprette og dele digitale julekalendere til noen du vil glede. Det er enkelt, morsomt og klimanøytralt."
			/>
			<meta property="og:type" content="website" />
			<meta
				name="description"
				content="Med Din Advent kan du opprette og dele digitale julekalendere til noen du vil glede. Det er enkelt, morsomt og klimanøytralt."
			/>
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
			<Navigation />
			<main className="site-content">{children}</main>
			<div className="da-footer">
				<div>
					<Link href="/privacy">Personvern</Link> | <Link href="/terms">Vilkår</Link> |{" "}
					<Link href="/about">Om oss</Link> | <Link href="/contact">Kontakt & tilbakemelding</Link>
				</div>
				<div className="da-footer-trademark">Made with ❤ in Drammen</div>
			</div>
		</div>
	</>
)

export default Layout
