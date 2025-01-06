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
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

export const StorageArray = z.array(Storage);

export const Space = z.object({
  id: z.string(),
  name: z.string(),
  totalSize: z.number(),
  currentSize: z.number(),
  unit: z.string(),
  description: z.string(),
  products: z.array(z.any()),
  storageId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

export const SpaceArray = z.array(Space);

export const Product = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  size: z.number(),
  unit: z.string(),
  attributes: z.record(z.any()),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

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
