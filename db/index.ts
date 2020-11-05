import { PrismaClient } from "@prisma/client"
export * from "@prisma/client"

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient()
} else {
	// Ensure the prisma instance is re-used during hot-reloading
	// Otherwise, a new client will be created on every reload
	globalThis["prisma"] = globalThis["prisma"] || new PrismaClient()
	prisma = globalThis["prisma"]
}

// prisma.$use(async (params, next) => {
// 	if (params.action === "create" && params.model == "Calendar") {
// 		const calendar = await next(params)
// 	}
// 	return next(params);
// });

export default prisma
