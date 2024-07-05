import express from "express";
import auth from "../../middlewares/auth";
import { PetController } from "./controller.pet";
import validateRequest from "../../middlewares/validateRequest";
import { petValidationSchemas } from "./validation.pet";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.patch(
  "/:petId",
  auth(UserRole.ADMIN),
  validateRequest(petValidationSchemas.updatePetValidationSchema),
  PetController.updateIntoDB
);
router.get(
  "/:petId",
  // auth(UserRole.USER, UserRole.ADMIN),
  PetController.getSinglePet
);

router.delete("/:petId", auth(UserRole.ADMIN), PetController.deleteFromDB);

router.get("/", PetController.getAllFromDB);

router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(petValidationSchemas.createPetValidationSchema),
  PetController.createPet
);

export const petRoutes = router;
