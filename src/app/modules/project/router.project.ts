import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserRole } from "@prisma/client";
import { projectValidationSchemas } from "./validation.project";
import { ProjectController } from "./controller.project";

const router = express.Router();

router.patch(
  "/:projectId",
  auth(UserRole.ADMIN),
  validateRequest(projectValidationSchemas.updateProjectSchema),
  ProjectController.updateIntoDB
);
router.get(
  "/:projectId",
  // auth(UserRole.USER, UserRole.ADMIN),
  ProjectController.getSingleProject
);

router.delete(
  "/:projectId",
  auth(UserRole.ADMIN),
  ProjectController.deleteFromDB
);

// get all
router.get("/", ProjectController.getAllFromDB);

router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(projectValidationSchemas.createProjectSchema),
  ProjectController.createProject
);

export const projectRoutes = router;
