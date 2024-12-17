import { z } from "zod";

export const ErrorSchema = z.object({
  type: z.string(),
  message: z.string(),
  context: z.nullable(z.string()),
});

export const ErrorResponse = z.object({ errors: z.array(ErrorSchema) });

export const Storage = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  spaces: z.array(z.any()),
  subStorages: z.array(z.any()),
});

export const StorageArray = z.array(Storage);

export const Space = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number(),
  description: z.string(),
  storageId: z.string(),
});

export const SpaceArray = z.array(Space);
