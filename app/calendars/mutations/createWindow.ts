import { WindowInputType } from "./../validations"
import { SessionContext } from "blitz"
import db from "db"
import { getDefaultComponents } from "app/utils/getDefaultComponents"

export default async function createWindow(
	{ data }: { data: WindowInputType },
	ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  if (!data.content) {
  	const components = getDefaultComponents()
  	data.content = {
  		components: [...components],
  	}
  }
  if (!data.day || data.day > 24 || data.day < 1) throw new Error("Dag må være mellom 1 og 24")

  // Test if JSON.stringify throws error
  JSON.stringify(data.content)

  const windows = await db.calendarWindow.findMany({ where: { calendarId: data.calendarId } })
  const matchingWindow = windows.filter((w) => {
  	if (w.day === data.day) return true
  	return false
  })

  // Already exist, return window
  if (matchingWindow.length > 0) return matchingWindow[0]

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
