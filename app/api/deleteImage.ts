import cloudinary from "app/utils/cloudinary"
import db from "db"
import { getSessionContext } from "@blitzjs/server"
import { NotFoundError, AuthenticationError } from "app/utils/errors"
import Sentry from "integrations/sentry"

const deleteImage = async (req, res) => {
	if (req.method === "DELETE") {
		try {
			const session = await getSessionContext(req, res)
			if (!session.userId) throw new AuthenticationError()
			const body = JSON.parse(req.body)
			const url = body.url
			if (!url) throw new Error("Missing body")
			const images = await db.image.findMany({ where: { url, userId: session.userId } })
			if (images.length !== 1) throw new NotFoundError()
			const image = images[0]
			await cloudinary.uploader.destroy(image.asset_id)
			await db.image.delete({ where: { id: image.id } })
			res.statusCode = 200
			res.setHeader("Content-Type", "application/json")
			res.end(JSON.stringify({ data: {} }))
		} catch (e) {
			Sentry.captureException(e)
			res.statusCode = e.statusCode || 500
			console.error("Error in catch", e)
			res.setHeader("Content-Type", "application/json")
			res.end(JSON.stringify({ message: e.message }))
		}
	} else {
		res.statusCode = 404
		res.end()
	}
}

export default deleteImage
