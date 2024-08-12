import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { RepositorySchema, CommitSchema } from "@/api/user/model";
import { validateRequest } from "@/common/utils/httpHandlers";
import { userController } from "./controller";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.register("Repository", RepositorySchema);
userRegistry.register("Commit", CommitSchema);

userRegistry.registerPath({
  method: "get",
  path: "/top-authors/:repoName",
  tags: ["User"],
  responses: createApiResponse(z.array(RepositorySchema), "Success"),
});

userRouter.get("/top-authors/:repoName", userController.topAuthors);

userRegistry.registerPath({
  method: "get",
  path: "/commits/:repoName",
  tags: ["User"],
  responses: createApiResponse(z.array(RepositorySchema), "Success"),
});

userRouter.get("/commits/:repoName", userController.getCommits);


