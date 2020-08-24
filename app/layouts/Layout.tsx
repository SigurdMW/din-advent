import { Head } from "blitz"

const Layout = ({ title, children }) => (
  <>
    <Head>
      <title>{title || "din-advent"}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {children}
  </>
)

export default Layout
