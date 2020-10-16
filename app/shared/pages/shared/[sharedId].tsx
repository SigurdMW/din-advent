import React, { Suspense } from "react"
import { useQuery, useParam, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import getSharedCalendar from "app/shared/queries/getSharedCalendar"
import { Calendar } from "app/components/Calendar"
import Spinner from "app/components/Spinner"

export const SharedCalendarRenderer = ({ sharedId }) => {
  const [calendar] = useQuery(getSharedCalendar, { sharedId })
  return <Calendar calendar={calendar} />
}

const SharedCalendarPage: BlitzPage = () => {
  const sharedId = useParam("sharedId", "string")
  if (!sharedId) return null
  return (
    <Suspense fallback={<Spinner />}>
      <SharedCalendarRenderer sharedId={sharedId} />
    </Suspense>
  )
}

SharedCalendarPage.getLayout = (page) => <Layout title="Kalender - Din Advent">{page}</Layout>

export default SharedCalendarPage
