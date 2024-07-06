import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { TPaginationOptions } from "../../interface/pagination";
import { petSearchAbleFields } from "../project/constant.project";

const createBlog = async (data: any) => {
  const createBlog = await prisma.blog.create({
    data,
  });

  return createBlog;
};

const getAllFromDB = async (params: any, options: TPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  // console.log("s", searchTerm, "f: ", filterData);

  const andConditions: Prisma.BlogWhereInput[] = [];
  // andConditions.push({
  //   status: "ACTIVE",
  // });

  if (searchTerm) {
    andConditions.push({
      OR: petSearchAbleFields.map((field: any) => ({
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
  const whereConditions: Prisma.BlogWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.blog.findMany({
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

  const total = await prisma.blog.count({
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
  const result = await prisma.blog.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return result;
};

const updateIntoDB = async (id: string, data: any): Promise<any> => {
  await prisma.blog.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.blog.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteFromDB = async (id: string) => {
  await prisma.blog.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.blog.delete({
    where: {
      id,
    },
  });

  return result;
};

export const BlogService = {
  createBlog,
  getAllFromDB,
  deleteFromDB,
  updateIntoDB,
  getSingleProject,
};
