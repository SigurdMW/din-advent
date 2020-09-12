import React, { Suspense } from "react"
import classes from "./Navigation.module.scss"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Link, Router } from "blitz"
import logout from "app/auth/mutations/logout"

const AnonHeader = () => (
  <>
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
          <Link href="/calendars">
            <a className="button small">
              <strong>Kalendere</strong>
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
      <Link href="/">
        <a>Hjem</a>
      </Link>
    </div>
    <div className={classes.right}>
      <Suspense fallback={AnonHeader}>
        <NavigationContent />
      </Suspense>
    </div>
  </div>
)

export default Navigation
