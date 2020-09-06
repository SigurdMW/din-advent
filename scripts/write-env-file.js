const fs = require("fs")
const path = require("path")
require("colors")

const root = path.resolve(__dirname, "../")

const doesFileExist = (file) =>
  new Promise((res, rej) => {
    fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
      if (err) {
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
      const env =
        'DATABASE_URL="file:./db.sqlite"\nFACEBOOK_APP_ID=1234\nFACEBOOK_APP_SECRET=1253123\nGOOGLE_CLIENT_ID=1634234\nGOOGLE_CLIENT_SECRET=some-secret\nMAILGUN_API_KEY=somekey\nMAILGUN_DOMAIN=somedomain\nMAILGUN_URL=someurl'
      await writeFile(path.resolve(root, "./.env"), env)
    }
    console.log("Successfully completed write env file".green)
    process.exit(0)
  } catch (e) {
    const message = e.message || "Error occured in script".red
    console.log(message)
    console.error(e)
    process.exit(1)
  }
}

run()
