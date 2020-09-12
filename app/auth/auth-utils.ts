import db from "db"

export const authenticateUser = async (requestToken: string) => {
  console.log("Authentication with loginToken " + requestToken)
  const loginRequest = await db.loginrequest.findOne({ where: { loginToken: requestToken } })
  console.log("login request", loginRequest)
  if (!loginRequest) {
    console.log("No loginrequest found for token " + requestToken)
    throw new Error("Noe gikk feil. Vennligst forsøk igjen")
  }
  await db.loginrequest.delete({ where: { id: loginRequest.id } })
  const user = await db.user.findOne({ where: { id: loginRequest?.userId } })
  if (!user) {
    console.log("No user found for userId: " + loginRequest.userId + " for token " + requestToken)
    throw new Error("Noe gikk feil. Vennligst forsøk igjen")
  }

  return user
}
