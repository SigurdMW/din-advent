import fetch from "node-fetch"

const requiredEnvVariables = [
  "VIPPS_CLIENT_ID",
  "VIPPS_CLIENT_SECRET",
  "VIPPS_SUBSCRIPTION_KEY",
  "VIPPS_URL",
  "VIPPS_MERCHANT_NUMBER",
]

const validateEnvVars = () => {
  const missingKeys: string[] = []
  requiredEnvVariables.forEach((key) => {
    if (!process.env.hasOwnProperty(key)) {
      missingKeys.push(key)
    }
  })
  if (missingKeys.length) {
    throw new Error("Missing keys in VippsUtils " + missingKeys.join(", "))
  }
}

interface InitiatePaymentPayload {
  mobileNumber: number
  orderId: number
}

const env = process.env as any

class VippsUtils {
  accessToken?: { access_token: string; expires_on: string }
  constructor() {
    validateEnvVars()
  }
  get url() {
    return env.VIPPS_URL.replace(/\/$/, "") + "/"
  }

  get accessTokenUrl() {
    return this.url + "accesstoken/get"
  }

  get initiatePaymentUrl() {
    return this.url + "ecomm/v2/payments"
  }

  get merchantNumber() {
    return env.VIPPS_MERCHANT_NUMBER
  }

  get accessTokenHeaders() {
    return {
      client_id: env.VIPPS_CLIENT_ID,
      client_secret: env.VIPPS_CLIENT_SECRET,
      "Ocp-Apim-Subscription-Key": env.VIPPS_SUBSCRIPTION_KEY,
    }
  }

  get headers() {
    if (!this.accessToken) return
    return {
      "Content-Type": "application/json",
      Authorization: this.accessToken.access_token,
      "Ocp-Apim-Subscription-Key": env.VIPPS_SUBSCRIPTION_KEY,
    }
  }

  async getAccessToken() {
    console.log("Getting access token")
    try {
      const shouldGetToken = this.shouldGetOrRefreshToken()
      if (shouldGetToken) {
        const request = await fetch(this.accessTokenUrl, {
          method: "POST",
          headers: this.accessTokenHeaders,
        })
        const accessToken = await request.json()
        this.accessToken = accessToken
      }
      console.log("Success getting access token")
    } catch (e) {
      console.error("Error in getAccessToken", e)
    }
    return this.accessToken
  }

  async initiatePayment({ mobileNumber, orderId }: InitiatePaymentPayload) {
    try {
      const accessToken = await this.getAccessToken()
      if (!accessToken) throw new Error("Missing access token")

      const payload = {
        customerInfo: {
          mobileNumber,
        },
        merchantInfo: {
          callbackPrefix: "http://localhost:3000/vipps/callbacks-for-payment-updates",
          fallBack: "http://localhost:3000/payment/" + orderId,
          merchantSerialNumber: this.merchantNumber,
        },
        transaction: {
          amount: 100,
          orderId,
          transactionText: "Kalender på Din Advent",
        },
      }
      const res = await fetch(this.initiatePaymentUrl, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      console.log(json)
    } catch (e) {
      throw e
    }
  }

  shouldGetOrRefreshToken() {
    if (!this.accessToken) return true
    const now = Math.round(Date.now() / 1000)
    return Number(this.accessToken.expires_on) - now < 1000
  }
}

const instance = new VippsUtils()

export default instance
