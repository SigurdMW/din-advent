import { PricePlan, Plan } from "app/interfaces/Payment"

export const price: PricePlan = {
  [Plan.starter]: 29,
  [Plan.basic]: 59,
  [Plan.plus]: 99,
}

export interface PricingItemData {
  price: number
  features: string[]
  name: string
  plan: Plan
}

const sharedFeatures = ["Del med så mange personer du vil", "Last opp dine egne bilder"]
export const pricePlanAndFeatures: Record<Plan, PricingItemData> = {
  [Plan.starter]: {
    plan: Plan.starter,
    price: price[Plan.starter],
    features: ["1 delt kalender", ...sharedFeatures],
    name: "En kalender",
  },
  [Plan.basic]: {
    plan: Plan.basic,
    price: price[Plan.basic],
    features: ["5 delte kalendere", ...sharedFeatures],
    name: "5 kalendere",
  },
  [Plan.plus]: {
    plan: Plan.plus,
    price: price[Plan.plus],
    features: ["Ubegrenset antall delte kalendere", ...sharedFeatures],
    name: "Ubegrenset",
  },
}
