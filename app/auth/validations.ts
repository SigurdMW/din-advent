import * as z from "zod"

export const SignupInput = z.object({
  email: z.string().email({ message: "Du må angi en gyldig e-post" }),
})
export type SignupInputType = z.infer<typeof SignupInput>

export const LoginInput = z.object({
  email: z.string().email({ message: "Du må angi en gyldig e-post" }),
})
export type LoginInputType = z.infer<typeof LoginInput>

export const LoginRequestInput = z.object({
  request: z.string(),
})
export type LoginRequestInputType = z.infer<typeof LoginRequestInput>
