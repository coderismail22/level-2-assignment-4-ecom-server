import express from "express";
import { BookingControllers } from "./booking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
import auth from "../../middlewares/auth";
const router = express.Router();

// Book a car (User only)
router.post(
  "/",
  auth("user"),
  validateRequest(BookingValidations.bookACarValidationSchema),
  BookingControllers.bookACar,
);

// Get booking by query parameters (Admin only)
router.get("/", auth("admin"), BookingControllers.getAllBookings);

// Get user bookings (User only)
router.get("/my-bookings", auth("user"), BookingControllers.getUserBookings);

export const BookingRoutes = router;
