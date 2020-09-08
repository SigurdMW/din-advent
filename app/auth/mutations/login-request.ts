import db from "db"
import { LoginInput, LoginInputType } from "../validations"
import { sendEmail } from "app/email"

export default async function loginRequest(input: LoginInputType) {
  // This throws an error if input is invalid
  const { email } = LoginInput.parse(input)
  const user = await db.user.findOne({ where: { email } })
  if (user) {
    const request = await db.loginrequest.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })
    console.log("Successfully created login request for " + email)
    // TODO: Create or copy last years email template
    const response = await sendEmail({
      to: email,
      subject: "Innloggingsforespørsel - Din Advent",
      html: `
			<h1>Innlogging til Din Advent</h1>
			<p>Noen, forhåpentlig vis du, har spurt om en innlogging til dinadvent.no. Trykk på linken for å fullføre innlogging:</p>
			<p><a href="${process.env.BASE_URL + "auth/" + request.loginToken}">Fullfør innlogging</a></p>`,
    })
    console.log("Successfully sent email to " + email)
  }
  return
}