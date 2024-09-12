import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetMovieSchema, MovieSchema } from "@/api/movie/movieModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { movieController } from "./movieController";

export const movieRegistry = new OpenAPIRegistry();
export const movieRouter: Router = express.Router();

movieRegistry.register("Movie", MovieSchema);

movieRegistry.registerPath({
  method: "get",
  path: "/movies",
  tags: ["Movie"],
  responses: createApiResponse(z.array(MovieSchema), "Success"),
});

movieRouter.get("/", movieController.getMovies);

movieRegistry.registerPath({
  method: "get",
  path: "/movies/search",
  parameters: [
    {
      name: "q",
      in: "query",
      required: true,
      schema: { type: "string" },
    },
  ],
  tags: ["Movie"],
  responses: createApiResponse(z.array(MovieSchema), "Success"),
});

movieRouter.get("/search", movieController.searchMovies);

movieRegistry.registerPath({
  method: "get",
  path: "/movies/{id}",
  tags: ["Movie"],
  request: { params: GetMovieSchema.shape.params },
  responses: createApiResponse(MovieSchema, "Success"),
});

movieRouter.get("/:id", validateRequest(GetMovieSchema), movieController.getMovie);
