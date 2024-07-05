import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import { UserRole, UserStatus } from "@prisma/client";

//  create user
const createUser = async (data: any) => {
  // console.log("ser", data);
  const hashPassword = await bcrypt.hash(data.password, 12);

  const userData = {
    name: data?.name,
    email: data?.email,
    contactNumber: data?.contactNumber,
    password: hashPassword,
    address: data.address,
    role: data?.role || UserRole.USER,
    status: data.status || UserStatus.ACTIVE,
  };

  const createUser = await prisma.user.create({
    data: userData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return createUser;
};

// login user
const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const result = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    accessToken,
  };

  return result;
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  const result = await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      // needPasswordChange: false,
    },
  });

  console.log("ser", result);
  return result;
};

export const AuthServices = {
  createUser,
  loginUser,
  changePassword,
};
