// Booking Schema
import mongoose, { Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const BookingSchema: Schema = new Schema<TBooking>(
  {
    date: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    startTime: { type: String }, // "HH:MM" format
    endTime: { type: String, default: null }, // "HH:MM" format
    totalCost: { type: Number, default: 0 }, // Calculated field, can be updated later
  },
  { timestamps: true },
);

export const Booking = mongoose.model<TBooking & mongoose.Document>(
  "Booking",
  BookingSchema,
);
