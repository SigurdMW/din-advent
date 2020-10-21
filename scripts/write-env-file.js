const fs = require("fs")
const path = require("path")
require("colors")

const root = path.resolve(__dirname, "../")

const doesFileExist = (file) =>
  new Promise((res, rej) => {
    fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(`${file} ${err.code === "ENOENT" ? "does not exist" : "is read-only"}`.yellow)
        res(false)
      }
      res(true)
    })
  })

const writeFile = (filename, data) =>
  new Promise((res, rej) => {
    fs.writeFile(filename, data, (err) => {
      if (err) {
        rej(err)
      }
      res()
    })
  })

const run = async () => {
  try {
    const fileExist = await doesFileExist(path.resolve(root, "./.env"))
    if (!fileExist) {
      const env = `DATABASE_URL="file:./db.sqlite"
FACEBOOK_APP_ID=1234
FACEBOOK_APP_SECRET=1253123
GOOGLE_CLIENT_ID=1634234
GOOGLE_CLIENT_SECRET=some-secret
MAILGUN_API_KEY=somekey
MAILGUN_DOMAIN=somedomain
MAILGUN_URL=someurl
VIPPS_CLIENT_ID=as123123
VIPPS_CLIENT_SECRET=asd123123
VIPPS_SUBSCRIPTION_KEY=asd1245123
VIPPS_URL=https://apitest.vipps.no/
VIPPS_MERCHANT_NUMBER=112353
STRIPE_KEY=sk_test_asdasdasdsa
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_t3qeasdasdasds
CLOUDINARY_API_KEY=3333213
CLOUDINARY_API_SECRET=tqrsadas3243243asdsd
NEXT_PUBLIC_GA_KEY=""
NEXT_PUBLIC_RECAPTCHA_KEY=4qrsad1232rsdasd
RECAPTCHA_SECRET=124rsadasdasd`
      await writeFile(path.resolve(root, "./.env"), env)
    }
    // eslint-disable-next-line no-console
    console.log("Successfully completed write env file".green)
    process.exit(0)
  } catch (e) {
    const message = e.message || "Error occured in script".red
    console.error(message)
    console.error(e)
    process.exit(1)
  }
}

run()
