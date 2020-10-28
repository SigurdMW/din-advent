import { AdminInputType } from "app/admins/validations"
import { SessionContext } from "blitz"
import db from "db"

export default async function createAdmin(
	{ data }: { data: AdminInputType },
	ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const loggedInEmail = ctx.session?.publicData.email

  if (loggedInEmail !== "sigurdmwahl@gmail.com") {
  	throw new Error("Unauthorized")
  }
  await db.user.update({ where: { email: data.email }, data: { role: "admin" } })
  return
}
