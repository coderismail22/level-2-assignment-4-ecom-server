import express from "express";
import { CarControllers } from "./car.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CarValidations } from "./car.validation";
import auth from "../../middlewares/auth";
const router = express.Router();

// 1.Create a car
router.post(
  "/",
  auth("admin"),
  validateRequest(CarValidations.createCarValidationSchema),
  CarControllers.createCar,
);

// 2.Get all cars
router.get("/", CarControllers.getAllCars);

// 3.Get a single car
router.get("/:id", CarControllers.getASingleCar);

// 4.Return a car (Admin only)
router.put("/return", auth("admin"), CarControllers.returnACar);

// 5.Update a single car (Admin only)
router.put(
  "/:id",
  auth("admin"),
  validateRequest(CarValidations.updateCarValidationSchema),
  CarControllers.updateACar,
);

// 6.Delete a single car (Admin only)
router.delete("/:id", auth("admin"), CarControllers.deleteACar);

export const CarRoutes = router;
