import React, { Suspense, useEffect, useState } from "react"
import { useRouter, useQuery, useParam, BlitzPage, Link } from "blitz"
import getCalendar from "app/calendars/queries/getCalendar"
import getShareKey from "app/calendars/queries/getShareKey"
import deleteCalendar from "app/calendars/mutations/deleteCalendar"
import Layout from "app/layouts/Layout"
import classes from "./calendar.module.scss"
import Calendar from "app/components/Calendar"
import Button from "app/components/Button"
import Modal from "app/components/Modal"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import shareCalendar from "app/calendars/mutations/shareCalendar"
import Spinner from "app/components/Spinner"

const getShareUrl = (shareKey: string) => {
  const { protocol, hostname } = window.location
  return protocol + "//" + hostname + "/" + "shared/" + shareKey
}

function copy() {
  const copyText = document.getElementById("copysharekey") as HTMLInputElement | null
  if (!copyText) return
  copyText.select()
  copyText.setSelectionRange(0, 99999) /*For mobile devices*/

  document.execCommand("copy")
}

export const CalendarRenderer = ({ calendarId }) => {
  const router = useRouter()
  const [calendar] = useQuery(getCalendar, { where: { id: calendarId } })
  const [shareKey] = useQuery(getShareKey, { where: { calendarId: calendarId } })
  const user = useCurrentUser()
  const [openShareModal, setOpenShareModal] = useState(false)
  const [createdShareKey, setCreatedShareKey] = useState("")
  const [isCreatingShareKey, setIsCreatingShareKey] = useState(false)
  const [didCopy, setDidCopy] = useState(false)

  const share = async () => {
    try {
      setIsCreatingShareKey(true)
      const newShareKey = await shareCalendar({ calendarId })
      setCreatedShareKey(newShareKey)
    } catch (e) {
      console.error(e)
    } finally {
      setIsCreatingShareKey(false)
    }
  }

  const handleDeleteCalendar = async () => {
    if (
      window.confirm(
        "Kalenderen og alt tilhørende innhold vil bli slettet. Handlingen kan ikke angres. Vil du fortsette?"
      )
    ) {
      await deleteCalendar({ where: { id: calendarId } })
      router.push("/calendars")
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setDidCopy(false)
    }, 5000)
  }, [didCopy])

  const onCopy = () => {
    setDidCopy(true)
    copy()
  }

  const getShareLinkInput = (key: string) => (
    <div style={{ display: "flex" }}>
      <input value={getShareUrl(key)} readOnly id="copysharekey" />
      <Button type="primary" onClick={onCopy}>
        {didCopy ? "Kopiert!" : "Kopier"}
      </Button>
    </div>
  )

  return (
    <div className={classes.calendar}>
      <Calendar calendar={calendar} />

      <Button type="primary" onClick={() => setOpenShareModal(true)}>
        Del kalender
      </Button>

      <button className="da-button da-btn-white" type="button" onClick={handleDeleteCalendar}>
        Slett kalender
      </button>

      <Modal
        isOpen={openShareModal}
        requestClose={() => setOpenShareModal(false)}
        label="Del kalender"
        header={<h2>Del kalender</h2>}
      >
        {user?.plan ? (
          <div>
            <p>Del denne linken med dem som skal få lov til å åpne kalenderen:</p>
            {shareKey || createdShareKey ? (
              <>{getShareLinkInput(shareKey || createdShareKey)}</>
            ) : (
              <>
                <Button onClick={share} type="primary" disabled={isCreatingShareKey}>
                  Del kalender nå
                </Button>
                {isCreatingShareKey && "Oppretter delingsnøkkel..."}
              </>
            )}
          </div>
        ) : (
          <p>
            Hvis du ønsker å dele kalenderen med noen, må du kjøpe et av våre produkter.{" "}
            <Link href="/pricing">
              <a>Se produkter og priser her</a>
            </Link>
          </p>
        )}
      </Modal>
    </div>
  )
}

const ShowCalendarPage: BlitzPage = () => {
  const calendarId = useParam("calendarId", "number")
  if (!calendarId) return null
  return (
    <Suspense fallback={<Spinner />}>
      <CalendarRenderer calendarId={calendarId} />
    </Suspense>
  )
}

ShowCalendarPage.getLayout = (page) => <Layout title="Kalender - Din Advent">{page}</Layout>

export default ShowCalendarPage
