import { logger } from "app/utils/logger"
import db, { User } from "db"

export const createLoginRequest = async (user: User) => {
	const request = await db.loginrequest.create({
		data: {
			user: {
				connect: {
					id: user.id,
				},
			},
		},
	})
	logger("Successfully created login request for " + user.email)
	return request
}
