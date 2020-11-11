import * as z from "zod"

// allow letters, numbers, and some selected marks like !? etc
// TODO: Enable emojis (\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])
const charsNumbersAndMarks = /^[\w0-9_ .!?_\)\(=+]*$/i

const calendarName = z.string()
	.nonempty()
	.min(1, "Navn må være minst 1 tegn.")
	.max(100, "Navn kan bare være 100 tegn langt.")
	.refine((val) => val.trim(), { message: "Navn må være angitt" })
	.refine((val) => charsNumbersAndMarks.test(val), { message: "Navn kan bare innholde bokstaver, tall, mellomrom og vanlige tegn."})

export const CalendarInput = z.object({
	name: calendarName
})
export type CalendarInputType = z.infer<typeof CalendarInput>

export const CalendarUpdate = z.object({
	name: calendarName.optional(),
	options: z.object({
		background: z.object({
			image: z.string().optional(),
			colorTheme: z.string().optional()
		}).optional()
	}).optional()
})
export type CalendarUpdateType = z.infer<typeof CalendarUpdate>

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
	email: z.string().email({ message: "Du må fylle inn e-post" })
})
export type ShareByEmailInputType = z.infer<typeof ShareByEmailInput>

export const ShareByEmailFunctionArgs = ShareByEmailInput.extend({
	calendarId: z.number(),
})
export type ShareByEmailFunctionArgsType = z.infer<typeof ShareByEmailFunctionArgs>

export const NewCollaboratorInput = z.object({
	email: z.string().email({ message: "Du må fylle inn e-post" }),
	roles: z.array(z.string())
})
export type NewCollaboratorInputType = z.infer<typeof NewCollaboratorInput>
