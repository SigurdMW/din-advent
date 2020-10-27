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
  await createRoleFromUserInvite(user)
  return user
}

const createRoleFromUserInvite = async ({ email, id }: User) => {
  const userInvites = await db.userInvite.findMany({ where: { email } })
  if (userInvites.length) {
    userInvites.forEach(async ({ id: inviteId, calendarId, role, createdBy }) => {
      try {
        await db.role.create({
          data: {
            role,
            calendar: {
              connect: { id: calendarId },
            },
            user: {
              connect: { id },
            },
            createdByUser: {
              connect: { id: createdBy },
            },
          },
        })
        await db.userInvite.delete({ where: { id: inviteId } })
      } catch (e) {
        logger(
          "Create role or delete userInvite failed for inviteId " + inviteId + " and userId " + id
        )
      }
    })
  }
  return
}

export const getPrivateData = async (id: User["id"]) => {
  const roles = await db.role.findMany({ where: { userId: id } })
  const updated = Date.now()
  return {
    roles,
    updated,
  }
}
