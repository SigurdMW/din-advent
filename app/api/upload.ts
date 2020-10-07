import { IncomingForm } from "formidable"
import { v2 as cloudinary } from "cloudinary"
import db from "db"
import { getSessionContext } from "@blitzjs/server"

const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env

if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error("Missing CLOUDINARY_API_SECRET or CLOUDINARY_API_KEY")
}

cloudinary.config({
  cloud_name: "dhimkvo6s",
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

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
          asset_id: image.asset_id,
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
      console.error("Error in catch", e)
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
