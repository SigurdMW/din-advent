import { CalendarInputType } from "./../validations"
import { SessionContext } from "blitz"
import db, { CalendarCreateArgs } from "db"

type CreateCalendarInput = {
  data: CalendarCreateArgs["data"]
}
export default async function createCalendar(
  { data }: { data: CalendarInputType },
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const userId = ctx.session!.userId
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

  return calendar.id
}
