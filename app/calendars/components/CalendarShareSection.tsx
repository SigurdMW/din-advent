import React, { ReactNode, useEffect, useState } from "react"
import { useQuery, Link } from "blitz"
import getShareKey from "app/calendars/queries/getShareKey"
import Button from "app/components/Button"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import shareCalendar from "app/calendars/mutations/shareCalendar"
import { ErrorName } from "app/utils/errors"
import Alert from "app/components/Alert"

const getShareUrl = (shareKey: string) => {
  const { protocol, hostname } = window.location
  return `${protocol}//${hostname}/shared/${shareKey}`
}

function copy() {
  const copyText = document.getElementById("copysharekey") as HTMLInputElement | null
  if (!copyText) return
  copyText.select()
  copyText.setSelectionRange(0, 99999) /*For mobile devices*/

  document.execCommand("copy")
}

export const CalendarShareSection = ({ calendarId }) => {
  const [shareKey] = useQuery(getShareKey, { where: { calendarId: calendarId } })
  const { user } = useCurrentUser()
  const [createdShareKey, setCreatedShareKey] = useState("")
  const [isCreatingShareKey, setIsCreatingShareKey] = useState(false)
  const [didCopy, setDidCopy] = useState(false)
  const [shareError, setShareError] = useState<null | ReactNode>(null)

  const share = async () => {
    try {
      setShareError(null)
      setIsCreatingShareKey(true)
      const newShareKey = await shareCalendar({ calendarId })
      setCreatedShareKey(newShareKey)
    } catch (e) {
      if (e.name === ErrorName.PaymentRequiredError) {
        setShareError(
          <Alert type="warning">
            <p>
              Whoops, det ser ut som du ikke har valgt en pakke enda.{" "}
              <Link href="/pricing">
                <a>Se priser og pakker her</a>
              </Link>
            </p>
          </Alert>
        )
      } else if (e.name === ErrorName.ExceededPlanError) {
        setShareError(
          <Alert type="warning">
            <p>
              Whoops, det ser ut som du er over begrensningene som ligger i din pakke.{" "}
              <Link href="/pricing">
                <a>Se priser og oppgrader her</a>
              </Link>
            </p>
          </Alert>
        )
      } else {
        setShareError(
          <Alert type="danger">
            <p>
              Oisann! Her gikk noe galt. Vennligst forsøk å logge ut og deretter prøv på nytt.
              Dersom problemet vedvarer,{" "}
              <Link href="/contact">
                <a>ta kontakt</a>
              </Link>
            </p>
          </Alert>
        )
      }
    } finally {
      setIsCreatingShareKey(false)
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
    <>
      {user?.plan ? (
        <div style={{ marginBottom: "1em" }}>
          <p>Del denne linken med dem som skal få lov til å åpne kalenderen:</p>
          {shareKey || createdShareKey ? (
            <>{getShareLinkInput(shareKey || createdShareKey)}</>
          ) : (
            <>
              <Button onClick={share} type="primary" disabled={isCreatingShareKey || !!shareError}>
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
      {shareError && shareError}
    </>
  )
}

export default CalendarShareSection
