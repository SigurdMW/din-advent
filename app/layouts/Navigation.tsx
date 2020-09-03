import React, { Suspense } from "react"
import classes from "./Navigation.module.scss"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Link } from "blitz"
import logout from "app/auth/mutations/logout"

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
          </Link>
          <Link href="/calendars">
            <a className="button small">
              <strong>Kalendere</strong>
            </a>
          </Link>
          <button
            onClick={async () => {
              await logout()
            }}
          >
            Logg ut
          </button>
        </>
      ) : (
        <>
          <Link href="/login">
            <a className="button small">
              <strong>Logg inn</strong>
            </a>
          </Link>
        </>
      )}
    </div>
  )
}

export const Navigation = () => (
  <div className={classes.navbar}>
    <Suspense fallback="Loading...">
      <NavigationContent />
    </Suspense>
  </div>
)

export default Navigation
