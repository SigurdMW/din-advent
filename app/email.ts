import mailgun from "mailgun.js"
import { emailTemplate } from "./emailTemplate"

const { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_URL } = process.env

if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN || !MAILGUN_URL) {
	throw new Error("Missing MailGun config")
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
  heading?: string
}

export const sendEmail = async ({ from, to, subject, html, heading }: EmailConfig) => {
	return mailgunClient.messages.create(MAILGUN_DOMAIN, {
		from: from || "Din Advent <noreply@dinadvent.no>",
		to,
		subject,
		html: emailTemplate({
			title: subject,
			heading: heading || subject,
			body: html
		}),
	})
}
	