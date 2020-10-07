import { NotFoundError } from "blitz"
import db from "db"

export default async function getSharedCalendar({ sharedId }: { sharedId: string }) {
  const shareKeys = await db.shareKey.findMany({ where: { key: sharedId } })
  if (shareKeys.length !== 1) throw new Error("Not found")
  const shareKey = shareKeys[0]
  const calendar = await db.calendar.findOne({ where: { id: shareKey.calendarId } })
  if (!calendar) throw new NotFoundError()

  return calendar
}
