const concurrently = require("concurrently")
require("colors")

process.env.DATABASE_URL = "file:./db.sqlite"

const run = async () => {
	try {
		await concurrently(["npm start", "npm run wait:test"], {
			killOthers: ["failure", "success"],
			successCondition: "first",
		})
		// eslint-disable-next-line
    console.log("\nSuccessfully finished test\n".green)
		process.exit(0)
	} catch (e) {
		console.error("\nFailure in tests\n".red)
		console.error(e)
		process.exit(1)
	}
}

run()
