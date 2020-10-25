import React, { Suspense } from "react"
import { useParam, BlitzPage, useQuery, Link } from "blitz"
import AuthLayout from "app/layouts/AuthLayout"
import Spinner from "app/components/Spinner"
import getShareKeys from "app/calendars/queries/getShareKeys"
import classes from "./share.module.scss"
import ShareKeyItem from "app/calendars/components/Share/ShareKeyItem"
import ShareByEmailSection from "app/calendars/components/Share/ShareByEmaiSection"
import ShareByLinkSection from "app/calendars/components/Share/ShareByLinkSection"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import Alert from "app/components/Alert"

const GetSharePage = ({ calendarId }) => {
  const [shareKeys, { mutate, refetch }] = useQuery(getShareKeys, { calendarId })
  const { user } = useCurrentUser()

  const handleDelete = async (id: number) => {
    await mutate(shareKeys.filter((e) => e.id !== id))
  }
  const onShared = async () => await refetch()
  return (
    <div>
      <h1>Del kalender</h1>
      <p>Det finnes 2 måter å dele en kalender på:</p>
      <ol>
        <li>Del med e-post (anbefalt)</li>
        <li>Del med link</li>
      </ol>
      <p>
        Deling med e-post er anbefalt da det innebærer at innholdet i kalenderen holdes privat.
        Dersom du velger å dele med link, kan alle som har linken åpne og se innholdet i kalenderen.
      </p>
      {user?.plan ? (
        <>
          <ShareByEmailSection calendarId={calendarId} onShared={onShared} />
          <br />
          <br />
          <ShareByLinkSection calendarId={calendarId} onShared={onShared} />
        </>
      ) : (
        <Alert type="warning">
          <p>
            For å dele denne kalenderen, må du kjøpe en pakke først.{" "}
            <Link href="/pricing">
              <a>Se priser og pakker her</a>
            </Link>
          </p>
        </Alert>
      )}
      <h2>Aktive delinger</h2>
      {shareKeys.length ? (
        <ul className={classes.list}>
          {shareKeys.map(({ key: shareKey, ...s }) => (
            <ShareKeyItem key={s.id} shareKey={shareKey} {...s} onDelete={handleDelete} />
          ))}
        </ul>
      ) : (
        <p>Du har ikke delt denne kalenderen med noen enda.</p>
      )}

      <br />
      <Link href={`/calendars/${calendarId}`}>
        <a>Tilbake til kalender</a>
      </Link>
    </div>
  )
}

const CalendarSharePage: BlitzPage = () => {
  const calendarId = useParam("calendarId", "number")

  return (
    <Suspense fallback={<Spinner />}>
      <GetSharePage calendarId={calendarId} />
    </Suspense>
  )
}

CalendarSharePage.getLayout = (page) => <AuthLayout title="Deling - Din Advent">{page}</AuthLayout>

export default CalendarSharePage
