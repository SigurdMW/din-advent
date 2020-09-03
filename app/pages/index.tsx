import { Link, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Suspense } from "react"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logout()
          }}
        >
          Logg ut
        </button>
        <div>
          Bruker id: <code>{currentUser.id}</code>
          <br />
          Bruker rolle: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href="/signup">
          <a className="button small">
            <strong>Opprett bruker</strong>
          </a>
        </Link>{" "}
        |
        <Link href="/login">
          <a className="button small">
            <strong>Logg inn</strong>
          </a>
        </Link>{" "}
        |
        <a href="/api/auth/facebook" className="button small">
          Logg inn med Facebook
        </a>{" "}
        |
        <a href="/api/auth/google" className="button small">
          Logg inn med Google
        </a>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div>
      <h1>Din Advent</h1>
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
