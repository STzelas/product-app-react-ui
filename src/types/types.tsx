import {z} from "zod";

// Product Type
export type productType = {
  id: number,
  name: string,
  description: string,
  brand: string,
  price: number,
  acquisitionDate: string,

}

// Register Schema
export const registerSchema = z.object({
  username: z.string().min(3, {error: "Username must be at least 3 characters"}),
  email: z.email({error: "Email must be a valid email"}),
  password: z.string().min(8, {error: "Password must be at least 8 characters"}),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  error: "Passwords do not match",
  path: ["confirmPassword"]
});

export type FormFields = z.infer<typeof registerSchema>

// Login Schema
export const loginSchema = z.object({
  username: z.string().min(1, {error: "Username is required"}),
  password: z.string().min(1, {error: "Password is required"}),
})

export type LoginFields = z.infer<typeof loginSchema>

// Login response from backend
export type LoginResponse = {
  access_token: string,
  token_type: string,
}