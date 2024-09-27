import { z } from "zod";

// Time validation schema for HH:mm 24-hour format
const timeStringFormatSchema = z.string().refine(
  (time) => {
    const regex = /^([01]\d|2[0-3]):[0-5]\d$/;
    return regex.test(time);
  },
  {
    message: "Invalid time format, expected HH:mm in 24-hour format.",
  },
);

// Date validation schema for YYYY-MM-DD format
const dateStringFormatSchema = z.string().refine(
  (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Ensure correct format YYYY-MM-DD
    return regex.test(date); // Just validate format, no parsing
  },
  {
    message: "Invalid date format, expected YYYY-MM-DD.",
  },
);

// Final validation schema
const bookACarValidationSchema = z.object({
  body: z.object({
    carId: z
      .string({ required_error: "Car ID is required" })
      .regex(
        /^[0-9a-fA-F]{24}$/,
        "Invalid Car ID format, expected a 24-character ObjectId.",
      ), // ObjectId validation

    date: dateStringFormatSchema, // Uses refined date schema
    startTime: timeStringFormatSchema, // Uses refined time schema
  }),
});

export const BookingValidations = { bookACarValidationSchema };
