import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { TPetFilterableFields, TProjects } from "./interface.project";
import { petSearchAbleFields } from "./constant.project";
import { TPaginationOptions } from "../../interface/pagination";

const createProject = async (data: any) => {
  const createProject = await prisma.project.create({
    data,
  });

  return createProject;
};

const getAllFromDB = async (params: any, options: TPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  // console.log("s", searchTerm, "f: ", filterData);

  const andConditions: Prisma.ProjectWhereInput[] = [];
  andConditions.push({
    status: "ACTIVE",
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
  const whereConditions: Prisma.ProjectWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.project.findMany({
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

  const total = await prisma.project.count({
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

const getSingleProject = async (id: string) => {
  const result = await prisma.project.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return result;
};

const updateIntoDB = async (id: string, data: any): Promise<any> => {
  await prisma.project.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.project.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteFromDB = async (id: string) => {
  await prisma.project.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.project.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ProjectService = {
  createProject,
  getAllFromDB,
  deleteFromDB,
  updateIntoDB,
  getSingleProject,
};
