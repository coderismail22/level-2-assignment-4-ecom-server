import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const getAllBookings = catchAsync(async (req, res) => {
  const { carId, date } = req.query;

  // Ensure that carId and date are either strings or undefined
  const filters = {
    carId: typeof carId === "string" ? carId : undefined,
    date: typeof date === "string" ? date : undefined,
  };

  const result = await BookingServices.getAllBookingsFromDB(filters);
  //if there are no result
  if (!result || result.length === 0) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: [], // Empty data array
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const bookACar = catchAsync(async (req, res) => {
  const { userEmail } = req?.user;

  const result = await BookingServices.bookACarIntoDB(req.body, userEmail);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Car booked successfully",
    data: result,
  });
});

const getUserBookings = catchAsync(async (req, res) => {
  const { userEmail } = req?.user;
  const result = await BookingServices.getUserBookingsFromDB(userEmail);
  //if there are no result
  if (!(result.length > 0)) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: [], // Empty data array
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "My Bookings retrieved successfully",
    data: result,
  });
});

export const BookingControllers = {
  getAllBookings,
  bookACar,
  getUserBookings,
};
