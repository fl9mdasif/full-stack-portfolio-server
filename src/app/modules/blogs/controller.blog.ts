import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { petFilterableFields } from "../project/constant.project";
import { BlogService } from "./service.blog";

// create
const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.createBlog(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, petFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  // console.log("c", filters);

  const result = await BlogService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blogs retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getSingle = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;

  const result = await BlogService.getSingleProject(blogId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single blog retrieved successfully",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;

  const result = await BlogService.updateIntoDB(blogId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "blogs updated successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;

  const result = await BlogService.deleteFromDB(blogId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "blog deleted successfully",
    data: result,
  });
});

export const BlogController = {
  getAllFromDB,
  getSingle,
  updateIntoDB,
  deleteFromDB,
  createBlog,
};
