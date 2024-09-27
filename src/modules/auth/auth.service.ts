import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import jwt from "jsonwebtoken";
import { TLoginUser, TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import config from "../../config";

const signUp = async (payload: TUser) => {
  const user = await User.create(payload);
  const userEmail = user?.email;

  const result = await User.findOne({ email: userEmail }).select("-password");

  return result;
};

const signIn = async (payload: TLoginUser) => {
  const { email, password } = payload;
  const user = await User.findOne({ email });

  // does the user exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // hashed password from db
  const hashedPassword = user?.password;

  // do passwords match (from statics)
  const doPasswordsMatch = await User.doPasswordsMatch(
    password,
    hashedPassword,
  );

  if (!doPasswordsMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Passwords do not match.");
  }

  const userData = user.toObject() as Partial<TUser>;
  delete userData.password;

  // token generation
  // const token = "replaceWithActualToken";
  const jwtPayload = { userEmail: user?.email, role: user?.role };
  const secret = config.jwt_access_token as string;
  const expiresIn = config.jwt_access_token_expires_in as string;

  const token = jwt.sign(jwtPayload, secret, {
    expiresIn,
  });

  return {
    userData,
    token: `Bearer ${token}`,
  };
};

export const AuthServices = {
  signUp,
  signIn,
};
