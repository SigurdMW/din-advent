import { CalendarInputType } from "./../validations"
import { SessionContext } from "blitz"
import db from "db"
import { getDefaultComponents } from "app/utils/getDefaultComponents"

export default async function createCalendar(
	{ data }: { data: CalendarInputType },
	ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const userId = ctx.session!.userId
  const numCalendars = await db.calendar.count({ where: { userId }})
  if (numCalendars > 50) throw new Error("Du kan ikke lage flere kalendere")
  const calendar = await db.calendar.create({
  	data: {
  		name: data.name,
  		user: {
  			connect: {
  				id: userId,
  			},
  		},
  	},
  })

  try {
  	const components = getDefaultComponents()
  	const createWindowPromise = (day: number, calendarId: number) =>
  		db.calendarWindow.create({
  			data: {
  				day,
  				content: JSON.stringify({ components }),
  				calendar: {
  					connect: {
  						id: calendarId,
  					},
  				},
  			},
  		})
  	await Promise.all(new Array(24).fill(0).map((c, i) => createWindowPromise(i + 1, calendar.id)))
  } catch (e) {
  	// nothing
  	console.error("Error creating calendar window when creating calendar", e)
  }

  return calendar.id
}
