import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { TPaginationOptions } from "../../interface/pagination";
import { TPetFilterableFields, TPets } from "./interface.pet";
import { petSearchAbleFields } from "./constant.pet";

const createPet = async (data: any) => {
  const createPet = await prisma.pet.create({
    data,
  });

  return createPet;
};

const getAllFromDB = async (params: any, options: TPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  // console.log("s", searchTerm, "f: ", filterData);

  const andConditions: Prisma.PetWhereInput[] = [];
  andConditions.push({
    petAdoptionStatus: false,
  });

  if (searchTerm) {
    andConditions.push({
      OR: petSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map((key) => ({
      [key]: {
        equals: (filterData as any)[key],
      },
    }));
    andConditions.push(...filterConditions);
  }
  const whereConditions: Prisma.PetWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.pet.findMany({
    where: whereConditions,
    // adoptionStatus: false,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.pet.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateIntoDB = async (
  id: string,
  data: Partial<TPets>
): Promise<TPets> => {
  await prisma.pet.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.pet.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const getSinglePet = async (id: string) => {
  const result = await prisma.pet.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return result;
};

const deleteFromDB = async (id: string) => {
  await prisma.pet.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.pet.delete({
    where: {
      id,
    },
  });

  return result;
};

export const PetService = {
  createPet,
  getAllFromDB,
  deleteFromDB,
  updateIntoDB,
  getSinglePet,
};
