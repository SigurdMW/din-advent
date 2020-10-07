import { SessionContext } from "blitz"
import db from "db"

type CreateShareKeyInput = {
  calendarId: number
}

export default async function shareCalendar(
  { calendarId }: CreateShareKeyInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const userId = ctx.session?.userId
  if (!userId || !calendarId) throw new Error("Missing userId or calendarId")

  const shareKey = await db.shareKey.create({
    data: {
      user: {
        connect: { id: userId },
      },
      calendar: {
        connect: { id: calendarId },
      },
    },
  })

  return shareKey.key
}
