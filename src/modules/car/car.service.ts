import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Booking } from "../booking/booking.model";
import { TCar } from "./car.interface";
import { Car } from "./car.model";
import { calculateTimeDifferenceInHours } from "./car.util";
import mongoose from "mongoose";

// 1. create a car
async function createCarIntoDB(payload: TCar) {
  const result = await Car.create(payload);
  return result;
}

// 2. get all cars
const getAllCarsFromDB = async () => {
  const result = await Car.find();
  return result;
};

// 3. get a single car
const getASingleCarFromDB = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};

// 4.Return a car (Admin only)
const returnACarIntoDB = async (payload: {
  bookingId: string;
  endTime: string;
}) => {
  const { bookingId, endTime } = payload;

  // Start a session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Find the booking
    const booking = await Booking.findById(bookingId).session(session);

    // 2. Check: Does the booking exist?
    if (!booking) {
      throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
    }

    const { startTime, car } = booking;

    // 3. Find the car and get price per hour
    const pricePerHourObj = await Car.findById(car)
      .select("pricePerHour")
      .session(session);
    const pricePerHour = Number(pricePerHourObj?.pricePerHour);

    if (!pricePerHour) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Car price information not found",
      );
    }

    // 4. Calculate the duration and total cost
    const duration = calculateTimeDifferenceInHours(startTime, endTime);
    const totalCost = duration * pricePerHour;

    // 5. Update the booking with endTime and totalCost
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        totalCost,
        endTime,
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBooking) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Unable to update the booking.",
      );
    }

    // 6. Update the car's status to available after the return
    const updateCarStatus = await Car.findByIdAndUpdate(
      car,
      { status: "available" },
      { new: true, session },
    );

    if (!updateCarStatus) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Unable to update car status.",
      );
    }

    // 7. Commit the transaction
    await session.commitTransaction();

    // 8. Find and return the updated booking
    const result = Booking.findById(bookingId).populate(
      "user car",
      "-password",
    ); // Populating user and car;
    return result;
  } catch (error) {
    // 9. Rollback the transaction if anything goes wrong
    await session.abortTransaction();
    throw error;
  } finally {
    // 10. End the session
    session.endSession();
  }
};

// 5. update a single car
const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  // without handling non-primitive fields
  const result = await Car.findByIdAndUpdate(id, payload, {
    runValidators: true,
    new: true,
  });
  return result;
};

// 6. delete a single car
const deleteCarFromDB = async (id: string) => {
  const result = await Car.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getASingleCarFromDB,
  returnACarIntoDB,
  updateCarIntoDB,
  deleteCarFromDB,
};
