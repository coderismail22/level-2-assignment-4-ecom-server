import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(AuthValidations.userSignUpValidationSchema),
  AuthControllers.signUp,
);
router.post(
  "/login",
  validateRequest(AuthValidations.userLoginValidationSchema),
  AuthControllers.signIn,
);

export const Auth = router;
