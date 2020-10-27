import { v2 as cloudinary } from "cloudinary"

const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env

if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
	throw new Error("Missing CLOUDINARY_API_SECRET or CLOUDINARY_API_KEY")
}

cloudinary.config({
	cloud_name: "dhimkvo6s",
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
})

export { cloudinary }
export default cloudinary
