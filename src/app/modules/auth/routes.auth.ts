import express from "express";
import { AuthController } from "./controller.auth";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { userValidationSchema } from "./validation.auth";

const router = express.Router();

router.post("/login", AuthController.loginUser);

router.post(
  "/register",
  validateRequest(userValidationSchema.UserRegSchema),
  AuthController.createUser
);

router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.USER),
  // validateRequest(userValidationSchema.changePassWord),
  AuthController.changePassword
);

export const AuthRoutes = router;
