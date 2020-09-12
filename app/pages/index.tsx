import { Link, BlitzPage } from "blitz"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Suspense } from "react"
import ArticleLayout from "app/layouts/ArticleLayout"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <div>
        <p>Du er nå logget inn</p>
        <Link href="/calendars">
          <a>Dine kalendere</a>
        </Link>
        <br />
        <br />
        Bruker id: <code>{currentUser.id}</code>
        <br />
        Bruker rolle: <code>{currentUser.role}</code>
      </div>
    )
  } else {
    return (
      <>
        <Link href="/signup">
          <a className="button small">
            <strong>Opprett gratis bruker</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => (
  <div>
    <h1>Din Advent</h1>
    <Suspense fallback="Loading...">
      <UserInfo />
    </Suspense>
  </div>
)

Home.getLayout = (page) => <ArticleLayout title="Forside - Din Advent">{page}</ArticleLayout>

export default Home
