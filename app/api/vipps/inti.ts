import fetch from "node-fetch"
const VippsBase = require("app/../utils/VippsUtils")

const init = async (req, res) => {
  const mobileNumber = 91128859
  const orderId = 123

  const payload = {
    customerInfo: {
      mobileNumber,
    },
    merchantInfo: {
      callbackPrefix: "http://localhost:3000/vipps/callbacks-for-payment-updates",
      fallBack: "http://localhost:3000/payment/" + orderId,
      merchantSerialNumber: VippsBase.merchantNumber,
    },
    transaction: {
      amount: 100,
      orderId,
      transactionText: "Kalender på Din Advent",
    },
  }
  const request = await fetch(VippsBase.initiatePaymentUrl, {
    method: "POST",
    headers: VippsBase.headers,
    body: JSON.stringify(payload),
  })
  const json = await request.json()
  console.log("From vipps", json)
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(json))
}

export default init
