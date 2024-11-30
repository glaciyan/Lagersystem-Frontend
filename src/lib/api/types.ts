import { z } from "zod";

export const ErrorSchema = z.object({
  type: z.string(),
  message: z.string(),
  context: z.nullable(z.string()),
});

export const ApiResponse = <T extends z.ZodTypeAny>(data: T) => z.object({
  message: z.string(),
  data,
});

export const Storage = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  spaces: z.array(z.any()),
  subStorages: z.array(z.any()),
});

export const StoragesResponse = ApiResponse(z.array(Storage));
export const StorageResponse = ApiResponse(Storage);
