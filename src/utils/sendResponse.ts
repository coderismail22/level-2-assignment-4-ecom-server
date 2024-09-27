import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T; // Make `data` optional
  token?: string; // Optional token for login responses
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const responseBody: any = {
    success: data.success,
    status: data.statusCode,
    message: data.message,
  };

  // Add `data` only if it exists and is not null
  if (data?.data !== undefined) {
    responseBody.data = data.data;
  }

  // Add `token` only if it exists
  if (data?.token) {
    responseBody.token = data.token;
  }

  res.status(data?.statusCode).json(responseBody);
};

export default sendResponse;
