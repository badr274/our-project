import * as yup from "yup";
export const addressSchema = yup
  .object({
    country: yup
      .string()
      .min(2, "Country must be at least 2 characters long")
      .max(50, "Country is too long"),
    city: yup
      .string()
      .min(2, "City must be at least 2 characters long")
      .max(50, "City is too long"),
    street: yup
      .string()
      .min(2, "Street must be at least 2 characters long")
      .max(50, "Street is too long"),
    postalCode: yup
      .string()
      .matches(/^\d{4,10}$/, "Invalid postal code format"),
    creditNumber: yup.string().min(14, "This field is required"),
    expiry: yup.string().min(4, "This field is required"),
    cvc: yup.string().min(3, "This field is required"),
  })
  .required();

export const signupSchema = yup
  .object({
    name: yup
      .string()
      .required("Username is required")
      .min(2, "Username must be at least 2 characters"),
    email: yup
      .string()
      .required("Valid email is required")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Email not valid"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)"
      ),
  })
  .required();
export const loginSchema = yup
  .object({
    email: yup
      .string()
      .required("Valid email is required")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Email not valid"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  })
  .required();
