import { IncomingForm } from "formidable"
import db from "db"
import { getSessionContext } from "@blitzjs/server"
import cloudinary from "app/utils/cloudinary"
import Sentry from "integrations/sentry"

export const config = {
	api: {
		bodyParser: false,
	},
}

const imageUpload = async (req, res) => {
	if (req.method === "POST") {
		try {
			const session = await getSessionContext(req, res)
			const data = await new Promise((resolve, reject) => {
				const form = new IncomingForm()

				form.parse(req, (err, fields, files) => {
					if (err) return reject(err)
					resolve({ fields, files })
				})
			})
			const filePath: string = (data as any).files.image.path

			if (!filePath) throw new Error("Image missing")

			const image = await cloudinary.uploader.upload(filePath)
			await db.image.create({
				data: {
					asset_id: image.public_id,
					url: image.secure_url,
					user: {
						connect: {
							id: session.userId,
						},
					},
				},
			})
			res.statusCode = 201
			res.setHeader("Content-Type", "application/json")
			res.end(JSON.stringify({ data: { link: image.secure_url } }))
		} catch (e) {
			Sentry.captureException(e)
			res.statusCode = 500
			res.setHeader("Content-Type", "application/json")
			res.end(e.message)
		}
	} else {
		res.statusCode = 404
		res.end()
	}
}

export default imageUpload
