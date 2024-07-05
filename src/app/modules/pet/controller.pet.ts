import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PetService } from "./service.pet";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { petFilterableFields } from "./constant.pet";

const createPet = catchAsync(async (req: Request, res: Response) => {
  const result = await PetService.createPet(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Pet added successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, petFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  // console.log("c", filters);

  const result = await PetService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pets retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const updateIntoDB = catchAsync(async (req, res, next) => {
  const { petId } = req.params;

  const result = await PetService.updateIntoDB(petId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pet profile updated successfully",
    data: result,
  });
});

const getSinglePet = catchAsync(async (req, res, next) => {
  // console.log('params',req.params);

  const { petId } = req.params;

  const result = await PetService.getSinglePet(petId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single pet retrieved successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req, res, next) => {
  const { petId } = req.params;

  const result = await PetService.deleteFromDB(petId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pet deleted successfully",
    data: result,
  });
});

export const PetController = {
  getAllFromDB,
  getSinglePet,
  updateIntoDB,
  deleteFromDB,
  createPet,
};
