import { Types } from "mongoose";

// Booking Type
export type TBooking = {
  date: string;
  user: Types.ObjectId; // ObjectId as string to reference the user model
  car: Types.ObjectId; // ObjectId as string to reference the car model
  startTime: string; // "HH:mm" 24-hour format
  endTime: string; // "HH:mm" 24-hour format
  totalCost: number;
};
