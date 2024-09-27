import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CarServices } from "./car.service";

// 1. create a car
const createCar = catchAsync(async (req, res) => {
  const result = await CarServices.createCarIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Car created successfully",
    data: result,
  });
});

// 2. get all cars
const getAllCars = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarsFromDB();

  //if there are no cars
  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }

  // if there are any cars
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Cars retrieved successfully",
    data: result,
  });
});

// 3. get a single car
const getASingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.getASingleCarFromDB(id);

  //if there are is car
  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "A car retrieved successfully",
    data: result,
  });
});

// 4. return a car
const returnACar = catchAsync(async (req, res) => {
  const result = await CarServices.returnACarIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Car returned successfully",
    data: result,
  });
});

// 5. update a car
const updateACar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.updateCarIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Car updated successfully",
    data: result,
  });
});

// 6. delete a car
const deleteACar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.deleteCarFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Car Deleted successfully",
    data: result,
  });
});

export const CarControllers = {
  createCar,
  getAllCars,
  getASingleCar,
  returnACar,
  updateACar,
  deleteACar,
};
