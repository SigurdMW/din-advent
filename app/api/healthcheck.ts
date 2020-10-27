const healthCheck = (req, res) => {
	res.statusCode = 200
	res.setHeader("Content-Type", "application/json")
	res.end(JSON.stringify({ status: "OK" }))
}

export default healthCheck
