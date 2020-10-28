import * as z from "zod"

export const CalendarInput = z.object({
	name: z.string(),
})
export type CalendarInputType = z.infer<typeof CalendarInput>

export const WindowInput = z.object({
	day: z.number().min(1).max(24),
	content: z.object({ components: z.array<any>([]) }).optional(),
	calendarId: z.number(),
})
export type WindowInputType = z.infer<typeof WindowInput>

export const GetWindowInput = z.object({
	day: z.number(),
	calendarId: z.number(),
})
export type GetWindowInputType = z.infer<typeof GetWindowInput>

export const ShareByEmailInput = z.object({
	email: z.string().email({ message: "Du må fylle inn e-post" }),
})
export const ShareByEmailFunctionArgs = ShareByEmailInput.extend({
	calendarId: z.number(),
})
export type ShareByEmailInputType = z.infer<typeof ShareByEmailInput>
export type ShareByEmailFunctionArgsType = z.infer<typeof ShareByEmailFunctionArgs>
