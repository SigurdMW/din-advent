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

export const CopyCalendarInput = z.object({
	calendarId: z.number(),
	email: z.string().email().optional()
})
export type CopyCalendarInputType = z.infer<typeof CopyCalendarInput>


export const FindOwnerInput = z.object({
	calendarId: z.number()
})
export type FindOwnerInputType = z.infer<typeof FindOwnerInput>
