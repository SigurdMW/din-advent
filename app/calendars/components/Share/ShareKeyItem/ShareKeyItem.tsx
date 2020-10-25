import React, { FC } from "react"
import Button from "app/components/Button"
import deleteShareKey from "app/calendars/mutations/deleteShareKey"
import { ShareKey, User } from "db"
import classes from "./ShareKeyItem.module.scss"

type ShareKeyItemProps = Omit<ShareKey, "key"> & {
  sharedWith: User | null
  shareKey: string | null
  onDelete: (id: number) => Promise<any>
}

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

const ShareKeyItem: FC<ShareKeyItemProps> = ({ id, shareKey, email, sharedWith, onDelete }) => {
  const hasShareKey = !!shareKey
  const hasEmail = !hasShareKey && !!email
  const hasSharedWith = !hasEmail && !!sharedWith
  const shareKeySubject = hasShareKey
    ? "link " + shareKey
    : hasEmail
    ? email
    : sharedWith?.name || sharedWith?.email

  const handleDelete = (id: number) => async () => {
    // eslint-disable no-restricted-globals
    if (window.confirm("Er du sikker på at du vil slette deling med " + shareKeySubject + "?")) {
      await deleteShareKey({ id })
      await onDelete(id)
    }
  }

  let content = <>Whoops, noe gikk galt 😅</>
  if (hasShareKey && shareKey) {
    const url = getShareUrl(shareKey)
    content = (
      <>
        <div>Delt med link</div>
        <div className={classes.copy}>
          <input value={url} readOnly={true} id="copysharekey" />
          <Button type="primary" onClick={copy}>
            Kopier link
          </Button>
        </div>
      </>
    )
  }
  if (hasEmail) {
    content = (
      <>Delt med e-post {email}. Denne personen har ikke opprettet bruker på dinadvent.no enda.</>
    )
  }
  if (hasSharedWith && sharedWith) {
    const name = sharedWith.name ? (
      <>
        {sharedWith.name} ({sharedWith.email})
      </>
    ) : (
      <>{sharedWith.email}</>
    )
    content = <>Delt med bruker {name}</>
  }
  return (
    <li className={classes.item}>
      <div className={classes.itemContent}>{content}</div>
      <Button type="secondary" onClick={handleDelete(id)}>
        Slett
      </Button>
    </li>
  )
}

export default ShareKeyItem
