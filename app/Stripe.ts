import Stripe from "stripe"
import db from "db"
import { Plan } from "./interfaces/Payment"
import { price } from "./price"
import { NotFoundError } from "app/utils/errors"

// type RequiredEnvKey<T> = (arr: T) => Array<{[key in keyof T]: any}>

// const getRequiredEnvKeys:RequiredEnvKey<["STRIPE_KEY"]> = (arr: string[]) => {
// 	return arr.map((key) => {
// 		if (!process.env.hasOwnProperty(key)) {
// 			throw new Error("Missing required key '" + key + "' in config")
// 		}
// 	})
// }

// const { STRIPE_KEY } = getRequiredEnvKeys(["STRIPE_KEY"])

const { STRIPE_KEY, BASE_URL, NEXT_PUBLIC_STRIPE_PUBLIC_KEY } = process.env

if (!STRIPE_KEY || !BASE_URL || !NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
	throw new Error("No STRIPE_KEY, BASE_URL, or NEXT_PUBLIC_STRIPE_PUBLIC_KEY available")

const stripe = new Stripe(STRIPE_KEY, {
	apiVersion: "2020-08-27",
})

export const createPaymentRequest = async ({ plan, userId }: { plan: Plan; userId: number }) => {
	const amountInOre = price[plan] * 100
	const user = await db.user.findUnique({ where: { id: userId } })
	if (!user) throw new NotFoundError()
	const session = await stripe.checkout.sessions.create({
		success_url: BASE_URL + "payments/success?sessionId={CHECKOUT_SESSION_ID}",
		cancel_url: BASE_URL + "payments/cancel",
		payment_method_types: ["card"],
		line_items: [
			{
				name: "Julekalender",
				quantity: 1,
				currency: "nok",
				amount: amountInOre,
			},
		],
		mode: "payment",
		customer_email: user.email
	})
	await db.payment.create({
		data: {
			amount: amountInOre,
			payload: JSON.stringify(session),
			plan,
			transactionId: session.id,
			provider: "stripe",
			user: {
				connect: {
					id: userId,
				},
			},
		},
	})
	return session.id
}

export const verifyPayment = async ({
	sessionId,
	userId,
}: {
  sessionId: string
  userId: number
}) => {
	const payments = await db.payment.findMany({ where: { transactionId: sessionId } })
	if (payments.length === 0) throw new NotFoundError()
	const payment = payments[0]
	if (payment.userId !== userId) throw new NotFoundError()
	const session = await stripe.checkout.sessions.retrieve(sessionId)
	if (session.amount_total !== payment.amount)
		throw new Error("Something went wrong: payment error 1")
	await db.payment.update({ where: { id: payment.id }, data: { completed: true } })
	await db.user.update({ where: { id: userId }, data: { plan: payment.plan } })
	return session
}
