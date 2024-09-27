import { z } from "zod";

// signup validation schema
const userSignUpValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(2, "Name must be at least 2 characters long"), // Name length validation

    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"), // Email format validation

    role: z.enum(["user", "admin"], { required_error: "Role is required" }), // Restrict role to 'user' or 'admin'

    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"), // Password length validation

    phone: z
      .string({ required_error: "Phone number is required" })
      .min(10, "Phone number must be at least 10 digits long") // Phone length validation

      // You can add regex for phone number validation if needed
      .regex(/^[0-9]+$/, "Phone number must contain only digits"),

    address: z
      .string({ required_error: "Address is required" })
      .min(5, "Address must be at least 5 characters long"), // Address length validation
  }),
});

// login validation schema
const userLoginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "User email is required" })
      .min(1, "User email cannot be empty"), // Ensure email is not empty

    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"), // Password length validation
  }),
});

export const AuthValidations = {
  userSignUpValidationSchema,
  userLoginValidationSchema,
};
