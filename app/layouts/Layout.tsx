import { Head, Link } from "blitz"
import Navigation from "./Navigation"

const GAKey = process.env.NEXT_PUBLIC_GA_KEY

const Layout = ({ title, children, hideHeader = false, description }) => (
	<>
		<Head>
			<title>{title || "Din Advent"}</title>
			<meta name="description" content={description || "Gled noen du kjenner med en digital julekalender i år! På Din Advent får du en kalender til en hyggelig pris. Prøv gratis på dinadvent.no."} />
			<meta charSet="utf-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width,initial-scale=1.0" />
			<link
				href="https://fonts.googleapis.com/css?family=Roboto:400,900,900i%26display=swap"
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
				content="https://www.dinadvent.no/promo-lossy-2x.png"
			/>
			<meta
				property="og:description"
				content="Gled noen du kjenner med en digital julekalender i år! På Din Advent får du en kalender til en hyggelig pris. Prøv gratis på dinadvent.no."
			/>
			<meta property="og:type" content="website" />
			{GAKey && (
				<>
					<script async src={"https://www.googletagmanager.com/gtag/js?id=" + GAKey}></script>
					<script dangerouslySetInnerHTML={{__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
		
						gtag('config', '${GAKey}');
					`}}></script>
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
		<script type="text/javascript" dangerouslySetInnerHTML={{__html: `
			var Tawk_API=Tawk_API ||{ }
			var Tawk_LoadStart= new Date();
			(function(){
				var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
				s1.async=true;
				s1.src='https://embed.tawk.to/5fbbe9d5920fc91564c9d900/default';
				s1.charset='UTF-8';
				s1.setAttribute('crossorigin','*');
				s0.parentNode.insertBefore(s1,s0);
			})();
		`}}>
		</script>
	</>
)

export default Layout
