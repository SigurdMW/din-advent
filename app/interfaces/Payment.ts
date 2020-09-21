export enum PaymentProvider {
  stripe = "stripe",
  vipps = "vipps",
}

export enum Plan {
  starter = "starter",
  basic = "basic",
  plus = "plus",
}

export type PricePlan = {
  [key in Plan]: number
}
