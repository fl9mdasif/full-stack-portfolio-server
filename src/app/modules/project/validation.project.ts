import { z } from "zod";

const createProjectSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "title is required!",
    }),
    des: z.string({
      required_error: "des is required!",
    }),
    img: z
      .string({
        required_error: "img url is required!",
      })
      .optional(),

    link: z.string({
      required_error: "link is required!",
    }),
    client: z
      .string({
        required_error: "client is required!",
      })
      .optional(),
    server: z
      .string({
        required_error: "server is required!",
      })
      .optional(),
    status: z.enum(["ACTIVE", "BLOCKED"]).optional(),

    createdAt: z
      .string({
        required_error: "createdAt is required!",
      })
      .optional(),
    updatedAt: z
      .string({
        required_error: "updatedAt is required!",
      })
      .optional(),
  }),
});

const updateProjectSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    title: z.string().optional(),
    des: z.string().optional(),
    img: z.string().optional(),

    link: z.string().optional(),
    client: z.string().optional(),
    server: z.string().optional(),
    status: z.enum(["ACTIVE", "BLOCKED"]).optional(),
    adoptionRequirements: z.string().optional(),

    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
});

export const projectValidationSchemas = {
  createProjectSchema,
  updateProjectSchema,
};
