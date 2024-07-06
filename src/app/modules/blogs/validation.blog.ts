import { z } from "zod";

const createBlogSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "title is required!",
    }),
    description: z.string({
      required_error: "description is required!",
    }),
    publish_date: z.string({
      required_error: "date is required!",
    }),
    author_name: z.string({
      required_error: "author name is required!",
    }),
    blog_image: z.string({
      required_error: "imgUrl is required!",
    }),
    total_likes: z.string({
      required_error: "total likes is required!",
    }),

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

const updateBlogSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    publish_date: z.string().optional(),
    author_name: z.string().optional(),
    blog_image: z.string().optional(),
    total_likes: z.string().optional(),
  }),
});

export const blogValidationSchemas = {
  createBlogSchema,
  updateBlogSchema,
};
