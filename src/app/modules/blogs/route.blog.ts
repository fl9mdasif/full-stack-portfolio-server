import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserRole } from "@prisma/client";
import { blogValidationSchemas } from "./validation.blog";
import { BlogController } from "./controller.blog";

const router = express.Router();

router.patch(
  "/:blogId",
  auth(UserRole.ADMIN),
  validateRequest(blogValidationSchemas.updateBlogSchema),
  BlogController.updateIntoDB
);
router.get(
  "/:blogId",
  // auth(UserRole.USER, UserRole.ADMIN),
  BlogController.getSingle
);

router.delete("/:blogId", auth(UserRole.ADMIN), BlogController.deleteFromDB);

// get all
router.get("/", BlogController.getAllFromDB);

router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(blogValidationSchemas.createBlogSchema),
  BlogController.createBlog
);

export const blogRoutes = router;
