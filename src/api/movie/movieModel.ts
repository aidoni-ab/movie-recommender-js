import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Movie = z.infer<typeof MovieSchema>;
export const MovieSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Input Validation for 'GET movies/:id' endpoint
export const GetMovieSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
