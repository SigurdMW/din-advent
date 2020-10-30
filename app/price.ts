import { PricePlan, Plan } from "app/interfaces/Payment"

export const price: PricePlan = {
	[Plan.starter]: 39,
	[Plan.basic]: 99,
	[Plan.plus]: 199,
}

export interface PricingItemData {
  price: number
  features: string[]
  name: string
  plan: Plan
}

const sharedFeatures = ["Del med e-post eller link", "Last opp dine egne bilder og innhold"]
export const pricePlanAndFeatures: Record<Plan, PricingItemData> = {
	[Plan.starter]: {
		plan: Plan.starter,
		price: price[Plan.starter],
		features: ["1 delt kalender", "For deg som vil gjøre noe hyggelig for en annen", ...sharedFeatures],
		name: "En kalender",
	},
	[Plan.basic]: {
		plan: Plan.basic,
		price: price[Plan.basic],
		features: ["10 delte kalendere", "For deg som har mange å glede", ...sharedFeatures],
		name: "10 kalendere",
	},
	[Plan.plus]: {
		plan: Plan.plus,
		price: price[Plan.plus],
		features: ["50 delte kalendere", "Perfekt for bedrifter",  ...sharedFeatures],
		name: "50 kalendere",
	},
}
