import { Head } from "blitz"
import Navigation from "./Navigation"

const Layout = ({ title, children }) => (
  <>
    <Head>
      <title>{title || "din-advent"}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta charSet="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
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
      <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
      <meta name="theme-color" content="#512B84" />
      <title>Din Advent - digital julekalender på nett</title>
      <meta property="og:title" content="Digital julekalender på nett" />
      <meta
        property="og:image"
        content="https://cdn.sanity.io/images/82cwwg7j/production/f9d39ef9172bfed82eeb82a42892ee9f881c887e-600x600.png"
      />
      <meta
        property="og:description"
        content="Med Din Advent kan du opprette og dele digitale julekalendere til noen du vil glede. Det er enkelt, morsomt og klimanøytralt."
      />
      <meta property="og:type" content="website" />
      <meta
        name="description"
        content="Med Din Advent kan du opprette og dele digitale julekalendere til noen du vil glede. Det er enkelt, morsomt og klimanøytralt."
      />
    </Head>

    <div className="site">
      <Navigation />
      <main className="site-content">{children}</main>
      <div className="da-footer" v-if="footer">
        <div>
          {/* <router-link :to="{ name: 'privacy' }">Personvern</router-link> | 
				<router-link :to="{ name: 'terms' }">Vilkår</router-link> | 
				<router-link :to="{ name: 'about' }">Om oss</router-link> | 
				<router-link :to="{ name: 'contact' }">Kontakt og tilbakemelding</router-link> */}
        </div>
        <div>Made with ❤ in Sætre</div>
      </div>
    </div>
  </>
)

export default Layout
