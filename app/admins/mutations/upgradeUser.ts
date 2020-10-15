import { UpgradeUserInputType, UpgradeUserInput } from "app/admins/validations"
import { SessionContext } from "blitz"
import db from "db"

export default async function upgradeUser(
  { data }: { data: UpgradeUserInputType },
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize("admin")
  UpgradeUserInput.parse(data)
  await db.user.update({ where: { email: data.email }, data: { plan: data.plan } })
  return
}
