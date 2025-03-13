import { z } from "zod";
export const addressSchema = z
  .object({
    country: z
      .string()
      .min(2, "Country must be at least 2 characters long")
      .max(50, "Country is too long"),
    city: z
      .string()
      .min(2, "City must be at least 2 characters long")
      .max(50, "City is too long"),
    street: z
      .string()
      .min(2, "Street must be at least 2 characters long")
      .max(50, "Street is too long"),
    postalCode: z.string().regex(/^\d{4,10}$/, "Invalid postal code format"),
    creditNumber: z.string().min(14, "This field is required"),
    expiry: z.string().min(4, "This field is required"),
    cvc: z.string().min(3, "This field is required"),
  })
  .required();
export const signupSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Valid email required"
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const loginSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Valid email required"
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
