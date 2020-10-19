import React, { Suspense } from "react"
import classes from "./Navigation.module.scss"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Link, Router } from "blitz"
import logout from "app/auth/mutations/logout"
import ProfileDropdown from "app/components/ProfileDropdown"

const ProfilePicture = () => {
  return (
    <div className={classes.profile} title="Din profil">
      <svg height="512" viewBox="0 0 512 512" width="512">
        <path
          d="m384 216v-16h-256v16s-32 93.071-32 128c0 120 115.876 106.2 144 112 5.9 1.216-20.741 32-16 32 8 0 192-8 192-144 0-34.929-32-128-32-128z"
          fill="#cddee7"
        />
        <path d="m360 304c0-61.856-46.562-112-104-112s-104 50.144-104 112v16h208z" fill="#fee5b5" />
        <path d="m376 168h-240l100-104h20 20z" fill="#dc2027" />
        <circle cx="256" cy="56" fill="#e6e6e6" r="32" />
        <g fill="#603913">
          <path d="m256 368c-10.617 0-20.844-6.461-30.4-19.2a8 8 0 1 1 12.8-9.594c4.383 5.836 10.989 12.8 17.6 12.8s13.219-6.961 17.6-12.8a8 8 0 1 1 12.8 9.594c-9.556 12.739-19.783 19.2-30.4 19.2z" />
          <path d="m224.008 272a8 8 0 0 1 -7.164-4.422c-5.43-10.867-8.813-11.578-8.844-11.578s-3.414.711-8.844 11.578a8 8 0 1 1 -14.312-7.156c2.527-5.055 10.215-20.422 23.156-20.422s20.629 15.367 23.156 20.422a8 8 0 0 1 -7.148 11.578z" />
          <path d="m320.008 272a8 8 0 0 1 -7.164-4.422c-5.43-10.867-8.813-11.578-8.844-11.578s-3.414.711-8.844 11.578a8 8 0 1 1 -14.312-7.156c2.527-5.055 10.215-20.422 23.156-20.422s20.629 15.367 23.156 20.422a8 8 0 0 1 -7.148 11.578z" />
        </g>
        <path
          d="m256 312s-32-16-56-16a39.327 39.327 0 0 0 -24 8c-24.588 18.441-48 16-48 16s33.6 24 72 24 56-32 56-32z"
          fill="#fff"
        />
        <path
          d="m256 312s32-16 56-16a39.327 39.327 0 0 1 24 8c24.588 18.441 48 16 48 16s-33.6 24-72 24-56-32-56-32z"
          fill="#fff"
        />
        <circle cx="256" cy="296" fill="#dc2027" r="24" />
        <rect fill="#e6e6e6" height="48" rx="16" width="272" x="120" y="168" />
      </svg>
    </div>
  )
}

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

  if (currentUser) {
    return (
      <>
        <Link href="/pricing">
          <a>Priser</a>
        </Link>
        <Link href="/calendars">
          <a className="button small">
            <strong>Dine kalendere</strong>
          </a>
        </Link>{" "}
        <ProfileDropdown triggerContent={<ProfilePicture />}>
          <span style={{ fontSize: "0.8em" }}>
            Hei{currentUser.name ? ", " + currentUser.name : ""}!
          </span>
          <ul>
            <li>
              <Link href="/profile">Din profil</Link>
            </li>
            <li>
              <button
                onClick={async () => {
                  await logout()
                  Router.push("/logout")
                }}
              >
                Logg ut
              </button>
            </li>
          </ul>
        </ProfileDropdown>
      </>
    )
  }
  return <AnonHeader />
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
