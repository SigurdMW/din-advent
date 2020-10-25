import db, { User, UserCreateInput } from "db"
import { logger } from "app/utils/logger"

export const createOrUpdateUser = async ({ email, name, active, role }: UserCreateInput) => {
  const user = await db.user.upsert({
    where: { email },
    create: {
      email,
      name,
      active,
      role,
    },
    update: { email, active },
  })
  await addUserIdToShareKey(user)
  return user
}

const addUserIdToShareKey = async ({ email, id: userId }: User) => {
  try {
    const shareKeys = await db.shareKey.findMany({ where: { email } })
    if (shareKeys.length) {
      shareKeys.forEach(async ({ id }) => {
        await db.shareKey.update({
          where: { id },
          data: {
            sharedWith: {
              connect: { id: userId },
            },
            email: null,
          },
        })
      })
    }
    return
  } catch (e) {
    if (e.message) {
      logger("Error: " + e.message)
    } else {
      logger("Error: " + e.toString())
    }
    return
  }
}
