import React, { Suspense } from "react"
import { BlitzPage } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"
import Spinner from "app/components/Spinner"
import { useCurrentUser } from "app/hooks/useCurrentUser"

const Profile = () => {
  const user = useCurrentUser()
  if (!user) return null
  return (
    <>
      <h1>Hei{user.name ? ", " + user.name : ""}!</h1>
    </>
  )
}

const CalendarsPage: BlitzPage = () => (
  <Suspense fallback={<Spinner />}>
    <Profile />
  </Suspense>
)

CalendarsPage.getLayout = (page) => <AuthLayout title="Profil - Din Advent">{page}</AuthLayout>

export default CalendarsPage
