import VippsBase from "app/VippsUtils"

const init = async (req, res) => {
  await VippsBase.initiatePayment({
    mobileNumber: 91128859,
    orderId: 123123,
  })
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({}))
}

export default init
