import type { Request, RequestHandler, Response } from "express";

import { userService } from "@/api/user/service";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class UserController {

  public topAuthors: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await userService.fetchTopAuthors();
    return handleServiceResponse(serviceResponse, res);
  };

  public getCommits: RequestHandler = async (req: Request, res: Response) => {
    const { repoName } = req.params;
    const serviceResponse = await userService.fetchCommits(repoName, new Date("2024-01-01").toISOString());
    return handleServiceResponse(serviceResponse, res);
  };

}

export const userController = new UserController();
