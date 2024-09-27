import express from "express";
import { Auth } from "../modules/auth/auth.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { CarRoutes } from "../modules/car/car.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: Auth,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
  {
    path: "/cars",
    route: CarRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
