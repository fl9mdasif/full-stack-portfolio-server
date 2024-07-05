import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { AuthServices } from "./service.auth";

const createUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);

  const result = await AuthServices.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User Created successfully!",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Logged in successfully!",
    data: {
      id: result.id,
      name: result.name,
      email: result.email,
      accessToken: result.accessToken,
    },
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    // console.log(user);

    const result = await AuthServices.changePassword(user, req.body);
    // console.log("con", result);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Password Changed successfully",
      data: result,
    });
  }
);
export const AuthController = {
  loginUser,
  changePassword,
  createUser,
};
