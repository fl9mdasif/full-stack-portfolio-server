import { z } from "zod";

const createPetValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required!",
    }),
    species: z.string({
      required_error: "species is required!",
    }),
    breed: z.string({
      required_error: "breed is required!",
    }),
    age: z.string({
      required_error: "age is required!",
    }),
    size: z.string({
      required_error: "size is required!",
    }),
    location: z.string({
      required_error: "location is required!",
    }),
    description: z
      .string({
        required_error: "description is required!",
      })
      .optional(),
    temperament: z
      .string({
        required_error: "temperament is required!",
      })
      .optional(),
    medicalHistory: z
      .string({
        required_error: "medicalHistory is required!",
      })
      .optional(),
    healthStatus: z.enum(["VACCINATED", "EUTERED"]),

    adoptionRequirements: z
      .string({
        required_error: "adoptionRequirements is required!",
      })
      .optional(),
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

const updatePetValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    species: z.string().optional(),
    breed: z.string().optional(),
    age: z.string().optional(),
    size: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    temperament: z.string().optional(),
    medicalHistory: z.string().optional(),
    adoptionRequirements: z.string().optional(),
    healthStatus: z.enum(["VACCINATED", "EUTERED"]).optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
});

export const petValidationSchemas = {
  createPetValidationSchema,
  updatePetValidationSchema,
};
