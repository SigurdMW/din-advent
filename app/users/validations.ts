import * as z from "zod"

export const UpdateUserInput = z.object({
	name: z.string(),
})
export type UpdateUserInputType = z.infer<typeof UpdateUserInput>
