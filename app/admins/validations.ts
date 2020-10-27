import * as z from "zod"

export const AdminInput = z.object({
	email: z.string().email(),
})
export type AdminInputType = z.infer<typeof AdminInput>

export const UpgradeUserInput = z.object({
	email: z.string().email(),
	plan: z.string(),
})
export type UpgradeUserInputType = z.infer<typeof UpgradeUserInput>
