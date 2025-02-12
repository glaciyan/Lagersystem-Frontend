import { z } from "zod";
import { roundNumber } from "~/lib/roundNumber";

export const DontCare = z.any();

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

export const StoredProduct = z.object({
  id: z.string(),
  productName: z.string(),
  productDescription: z.string(),
  productSize: z.number(),
  productUnit: z.string(),
  attribute: z.record(z.any()).optional(),
  size: z.number(),
  quantity: z.number(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

export const Space = z.object({
  id: z.string(),
  name: z.string(),
  totalSize: z.number(),
  currentSize: z.number().transform(num => roundNumber(num)),
  unit: z.optional(z.string()),
  description: z.string(),
  // storedProducts: z.array(StoredProduct),
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

export const StoredProductArray = z.array(StoredProduct);

export const BreadcrumbType = z.enum(["storage", "space"]);

export const BreadcrumbItem = z.object({
  id: z.string(),
  name: z.string(),
  type: BreadcrumbType,
});

export const BreadcrumbPath = z.object({
  entries: z.array(BreadcrumbItem),
});

export const SearchResult = z.object({
  type: z.string(),
  rank: z.number(),
  id: z.string(),
  breadcrumb: BreadcrumbPath.nullable(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  attributes: z.any().optional().nullable(),
  unit: z.string().optional().nullable(),
  totalSize: z.number().optional().nullable(),
  currentSize: z.number().optional().nullable(),
  size: z.number().optional().nullable(),
});
