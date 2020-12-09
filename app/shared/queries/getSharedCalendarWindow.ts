import { NotFoundError } from "app/utils/errors"
import db from "db"

export default async function getSharedCalendarWindow({
	sharedId,
	day,
}: {
  sharedId: string
  day: number
}) {
	if (!sharedId || !day) throw new NotFoundError()
	const shareKeys = await db.shareKey.findMany({ where: { key: sharedId } })
	if (shareKeys.length !== 1) throw new NotFoundError()
	const shareKey = shareKeys[0]
	const calendar = await db.calendar.findUnique({ where: { id: shareKey.calendarId } })
	if (!calendar) throw new NotFoundError()
	const windows = await db.calendarWindow.findMany({ where: { day, calendarId: calendar.id } })
	if (windows.length === 0) throw new NotFoundError()
	return windows[0]
}
