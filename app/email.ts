import mailgun from "mailgun.js"

const { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_URL } = process.env

if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN || !MAILGUN_URL) {
  throw new Error("Missing MailGun config")
  process.exit(1)
}

const mailgunClient = mailgun.client({
  username: "api",
  key: MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN,
  url: `https://${MAILGUN_URL}`,
})

interface EmailConfig {
  to: string | string[]
  from?: string
  subject: string
  html: string
}

export const sendEmail = async (email: EmailConfig) =>
  mailgunClient.messages.create(MAILGUN_DOMAIN, {
    from: email.from || "Din Advent <noreply@dinadvent.no>",
    to: email.to,
    subject: email.subject,
    html: email.html,
  })
