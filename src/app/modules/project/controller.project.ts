import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { petFilterableFields } from "./constant.project";
import { ProjectService } from "./service.project";

// create
const createProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.createProject(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "project created successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, petFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  // console.log("c", filters);

  const result = await ProjectService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Projects retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleProject = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;

  const result = await ProjectService.getSingleProject(projectId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single project retrieved successfully",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;

  const result = await ProjectService.updateIntoDB(projectId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Projects updated successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;

  const result = await ProjectService.deleteFromDB(projectId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "project deleted successfully",
    data: result,
  });
});

export const ProjectController = {
  getAllFromDB,
  getSingleProject,
  updateIntoDB,
  deleteFromDB,
  createProject,
};
