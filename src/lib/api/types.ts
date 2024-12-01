import { z } from "zod";

export const ErrorSchema = z.object({
  type: z.string(),
  message: z.string(),
  context: z.nullable(z.string()),
});

export const ErrorResponse = z.array(ErrorSchema);

export const Storage = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  spaces: z.array(z.any()),
  subStorages: z.array(z.any()),
});
