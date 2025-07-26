import {z} from "zod";

export type ProductType = {
  id: number,
  name: string,
  description: string,
  brand: string,
  price: number,
  acquisitionDate: string,

}


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