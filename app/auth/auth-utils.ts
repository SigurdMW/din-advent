import { logger } from "./../utils/logger"
// eslint-disable no-console
import db from "db"

const expiredRequest = (millisecondsSinceRequest: number) => {
  const now = Date.now()
  const secondsDifference = (now - millisecondsSinceRequest) / 1000
  const threshold = 12 * 60 * 60
  if (secondsDifference > threshold) return true
  return false
}

export const validateLoginRequest = async (requestToken: string) => {
  logger("Authentication with loginToken " + requestToken)
  const loginRequest = await db.loginrequest.findOne({ where: { loginToken: requestToken } })
  if (!loginRequest) {
    logger("No loginrequest found for token " + requestToken)
    throw new Error("Noe gikk feil. Vennligst forsøk igjen")
  }
  const expired = expiredRequest(loginRequest?.createdAt.getTime())
  if (expired) {
    logger("Expired login request used")
    throw new Error("Noe gikk feil. Vennligst gjennomfør ny innlogging.")
  }

  await db.loginrequest.delete({ where: { id: loginRequest.id } })
  const user = await db.user.findOne({ where: { id: loginRequest?.userId } })
  if (!user) {
    logger("No user found for userId: " + loginRequest.userId + " for token " + requestToken)
    throw new Error("Noe gikk feil. Vennligst forsøk igjen")
  }
  if (!user.active) await db.user.update({ where: { id: user.id }, data: { active: true } })

  return user
}
