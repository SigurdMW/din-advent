import Button from "app/components/Button"
import Modal from "app/components/Modal"
import React, { FC, useState } from "react"
import ShareByEmailForm from "./ShareByEmailForm"

interface ShareByEmailSectionProps {
  calendarId: number
  onShared: () => Promise<any>
}

export const ShareByEmailSection: FC<ShareByEmailSectionProps> = ({ calendarId, onShared }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Del med e-post
      </Button>
      <Modal isOpen={isOpen} requestClose={() => setIsOpen(false)} label="Del med e-post">
        <ShareByEmailForm calendarId={calendarId} onShared={onShared} />
      </Modal>
    </>
  )
}

export default ShareByEmailSection
