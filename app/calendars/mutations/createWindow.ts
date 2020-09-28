import { WindowInputType } from "./../validations"
import { SessionContext } from "blitz"
import db from "db"

export default async function createWindow(
  { data }: { data: WindowInputType },
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  if (!data.content) {
    data.content = { components: [] }
  }
  if (!data.day || data.day > 24 || data.day < 1) throw new Error("Dag må være mellom 1 og 24")
  // See that JSON.stringify doesn't throw error
  JSON.stringify(data.content)

  const windows = await db.calendarWindow.findMany({ where: { calendarId: data.calendarId } })
  windows.forEach((w) => {
    if (w.day === data.day) throw new Error("Dagen finnes allerede")
  })

  const window = await db.calendarWindow.create({
    data: {
      day: data.day,
      content: JSON.stringify(data.content),
      calendar: {
        connect: {
          id: data.calendarId,
        },
      },
    },
  })

  return window
}
