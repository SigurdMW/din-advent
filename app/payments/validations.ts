import * as z from "zod"

export const PaymentInput = z.object({
	plan: z.string(),
})
export type PaymentInputType = z.infer<typeof PaymentInput>
