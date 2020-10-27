import React, { FC } from "react"
import { ShareKey } from "db"
import ShareItem from "../ShareItem"
import Button from "app/components/Button"
import deleteShareKey from "app/calendars/mutations/deleteShareKey"

interface UserShareListingProps {
  shareLinks: ShareKey[]
  onDelete: (id: ShareKey["id"]) => void
}

const getShareUrl = (shareKey: string) => {
  const { protocol, hostname } = window.location
  return `${protocol}//${hostname}/shared/${shareKey}`
}

const copy = (id: string) => () => {
  const copyText = document.getElementById(id) as HTMLInputElement | null
  if (!copyText) return
  copyText.select()
  copyText.setSelectionRange(0, 99999) /*For mobile devices*/

  document.execCommand("copy")
}

const UserShareListing: FC<UserShareListingProps> = ({ shareLinks, onDelete }) => {
  const handleDeleteLink = async (link: ShareKey) => {
    if (window.confirm("Er du sikker på at du vil slette linken " + link.key + "?")) {
      await deleteShareKey({ id: link.id })
      onDelete(link.id)
    }
  }
  if (shareLinks.length === 0) return null
  return (
    <>
      <h3>Delt med link</h3>
      {shareLinks.length ? (
        <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
          {shareLinks.map((link) => {
            const shareUrl = getShareUrl(link.key)
            const id = "sharelinkinput-" + link.id
            return (
              <ShareItem
                key={link.id}
                actions={
                  <Button type="secondary" onClick={() => handleDeleteLink(link)}>
                    Slett
                  </Button>
                }
              >
                <div style={{ marginBottom: "8px" }}>Delt med link</div>
                <div style={{ display: "flex" }}>
                  <input type="text" value={shareUrl} readOnly={true} id={id} />
                  <Button type="primary" onClick={copy(id)}>
                    Kopier
                  </Button>
                </div>
              </ShareItem>
            )
          })}
        </ul>
      ) : (
        <p>Denne kalenderen er ikke delt med link.</p>
      )}
    </>
  )
}

export default UserShareListing
