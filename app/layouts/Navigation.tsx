import React, { Suspense } from "react"
import classes from "./Navigation.module.scss"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Link, Router } from "blitz"
import logout from "app/auth/mutations/logout"

const AnonHeader = () => (
  <>
    <Link href="/pricing">
      <a>Priser</a>
    </Link>
    <Link href="/signup">
      <a>Ny bruker</a>
    </Link>{" "}
    <Link href="/login">
      <a className="button small">
        <strong>Logg inn</strong>
      </a>
    </Link>
  </>
)

export const NavigationContent = () => {
  const currentUser = useCurrentUser()

  return (
    <div>
      {currentUser ? (
        <>
          <Link href="/pricing">
            <a>Priser</a>
          </Link>
          <Link href="/calendars">
            <a className="button small">
              <strong>Dine kalendere</strong>
            </a>
          </Link>{" "}
          <button
            onClick={async () => {
              await logout()
              Router.push("/logout")
            }}
          >
            Logg ut
          </button>
        </>
      ) : (
        <AnonHeader />
      )}
    </div>
  )
}

export const Navigation = () => (
  <div className={classes.navbar}>
    <div className={classes.left}>
      <div className="show-desktop">
        <Link href="/">
          <a>
            <img src="/da-logo.svg" className={classes.logo} alt="Startside for Din Advent" />
          </a>
        </Link>
      </div>
      <div className="show-mobile">
        <Link href="/">
          <a>
            <img src="/da-logo-small.png" className={classes.logo} alt="Startside for Din Advent" />
          </a>
        </Link>
      </div>
    </div>
    <div className={classes.right}>
      <Suspense fallback={<AnonHeader />}>
        <NavigationContent />
      </Suspense>
    </div>
  </div>
)

export default Navigation
