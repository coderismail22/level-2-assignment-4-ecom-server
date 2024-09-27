/* eslint-disable no-unused-vars */
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import config from "../config"; // your configuration file
import catchAsync from "../utils/catchAsync";
import { TUserRole } from "../modules/user/user.interface";
import sendResponse from "../utils/sendResponse";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: "You have no access to this route",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_token as string,
      ) as JwtPayload;
    } catch (err) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: "You have no access to this route",
      });
    }

    const { role } = decoded;

    // Check if the user's role matches the required roles
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      return sendResponse(res, {
        statusCode: httpStatus.FORBIDDEN,
        success: false,
        message: "You have no access to this route",
      });
    }

    // Attach the user's email and role to the request object
    req.user = decoded;
    next();
  });
};

export default auth;
