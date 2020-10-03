import Stripe from "stripe"
import db from "db"
import { Plan } from "./interfaces/Payment"
import { price } from "./price"

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
  const session = await stripe.checkout.sessions.create({
    success_url: BASE_URL + "payments/success",
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
  })
  await db.payment.create({
    data: {
      amount: amountInOre,
      payload: JSON.stringify(session),
      plan,
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
