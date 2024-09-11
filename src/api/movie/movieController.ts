import type { Request, RequestHandler, Response } from "express";

import { movieService } from "@/api/movie/movieService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class MovieController {
  public getMovies: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await movieService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getMovie: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await movieService.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const movieController = new MovieController();
