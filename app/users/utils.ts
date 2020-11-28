import db, { User, UserCreateInput } from "db"
import { PrivateData } from "blitz"
import Sentry from "integrations/sentry"

export const createOrUpdateUser = async ({ email: uncasedEmail, name, active, role }: UserCreateInput) => {
	const email = uncasedEmail.toLowerCase()
	try {
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
	} catch (e) {
		Sentry.captureMessage("createOrUpdateUser failed", Sentry.Severity.Critical)
		Sentry.captureException(e)
		throw e
	}
}

const createRoleFromUserInvite = async ({ email: uncasedEmail, id }: User) => {
	const email = uncasedEmail.toLowerCase()
	const userInvites = await db.userInvite.findMany({ where: { email } })
	if (userInvites.length) {
		userInvites.forEach(async ({ id: inviteId, calendarId, role, createdBy }) => {
			try {
				if (!role || !calendarId) return // no role or calendarId means it's a general user invite
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
				Sentry.captureMessage("Create role or delete userInvite failed for inviteId " + inviteId + " and userId " + id, Sentry.Severity.Critical)
				Sentry.captureException(e)
			}
		})
	}
	return
}

export const getPrivateData = async (id: User["id"]): Promise<PrivateData> => {
	const roles = await db.role.findMany({ where: { userId: id } })
	const updated = Date.now()
	return {
		roles,
		updated,
	}
}

export const getPublicData = (user: User, source: string) => ({
	id: user.id,
	userId: user.id,
	roles: [user.role],
	role: user.role,
	plan: user.plan,
	email: user.email,
	source
})