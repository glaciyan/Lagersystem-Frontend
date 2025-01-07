import { z } from "zod";

export const ErrorSchema = z.object({
  type: z.string(),
  message: z.string(),
  context: z.nullable(z.string()),
});

export const ErrorResponse = z.object({ errors: z.array(ErrorSchema) });

export const Product = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  size: z.number(),
  unit: z.optional(z.string()),
  attributes: z.record(z.any()),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

export const Space = z.object({
  id: z.string(),
  name: z.string(),
  totalSize: z.number(),
  currentSize: z.number(),
  unit: z.optional(z.string()),
  description: z.string(),
  storedProducts: z.array(Product),
  storageId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

export const SpaceArray = z.array(Space);

const baseStorage = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  parentId: z.nullable(z.string()),
  spaces: SpaceArray,
  // subStorages: z.array(z.any()),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

export type StorageType = z.infer<typeof baseStorage> & {
  subStorages: StorageType[];
};

export const Storage: z.ZodType<StorageType> = baseStorage.extend({
  subStorages: z.lazy(() => Storage.array()),
});

export const StorageArray = z.array(Storage);

export const ProductArray = z.array(Product);

export const StoredProduct = z.object({
  id: z.string(),
  productId: z.string(),
  spaceId: z.string(),
  productName: z.string(),
  productDescription: z.string(),
  productSize: z.number(),
  productUnit: z.string(),
  attribute: z.record(z.any()),
  quantity: z.number(),
  size: z.number(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

export const StoredProductArray = z.array(StoredProduct);
