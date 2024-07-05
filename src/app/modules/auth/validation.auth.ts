import { z } from "zod";

import prisma from "../../../shared/prisma";

const isUniqueEmail = async (field: string) => {
  // Check if email already exists in the database
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: field }, { name: field }],
    },
  });

  return !existingUser;
};

const UserRegSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: z
      .string({
        required_error: "Email is required!",
      })
      .refine(
        async (name) => {
          // Check uniqueness of email
          return await isUniqueEmail(name);
        },
        { message: "Name already exists" }
      ),
    email: z
      .string({
        required_error: "Valid Email is required!",
      })
      .email()
      .refine(
        async (email) => {
          // Check uniqueness of email
          return await isUniqueEmail(email);
        },
        { message: "Email already exists" }
      ),
    password: z.string({
      required_error: "password is required!",
    }),
    contactNumber: z.string(),
    role: z.enum(["USER", "ADMIN"]).optional(),
    address: z.string().optional(),
    status: z.enum(["ACTIVE", "BLOCKED"]).optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
});

const changePassWord = {
  body: z.object({
    oldPassword: z.string({
      required_error: "old password is required!",
    }),
    newPassword: z.string({
      required_error: "new password is required!",
    }),
  }),
};

export const userValidationSchema = {
  UserRegSchema,
  changePassWord,
};
