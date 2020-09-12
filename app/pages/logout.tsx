import Layout from "app/layouts/ArticleLayout"
import { Link } from "blitz"

export const LogoutPage = () => (
  <div>
    <h1>Du er nå logget ut</h1>
    <p>Du er nå logget ut av Din Advent og kan lukke nettleseren.</p>
    <p>
      Glemt noe?{" "}
      <Link href="/login">
        <a>Logg inn igjen</a>
      </Link>
    </p>
  </div>
)

LogoutPage.getLayout = (page) => <Layout title="Logget ut - Din Advent">{page}</Layout>

export default LogoutPage
