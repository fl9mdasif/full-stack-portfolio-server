import express from "express";
import { AuthRoutes } from "../modules/auth/routes.auth";
import { projectRoutes } from "../modules/project/router.project";
import { blogRoutes } from "../modules/blogs/route.blog";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/projects",
    route: projectRoutes,
  },
  {
    path: "/blogs",
    route: blogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
