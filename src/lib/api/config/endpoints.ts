import { z } from "zod";
import { endpoint } from "../endpoint.ts";
import { Storage } from "../types.ts";

const deleteStorageResponseSchema = z.object({
  message: z.string(),
});

export const endpoints = {
  getStorages: endpoint("GET", "/storages").withQuery<{ depth?: number }>().returns(z.array(Storage)),
  getStorage: endpoint<{ id: string }>("GET", p => `/storages/${p.id}`).returns(Storage),
  postStorage: endpoint("POST", "/storages").withBody<{ name: string; description: string; parentId?: string }>().returns(Storage),
  deleteStorage: endpoint<{ id: string }>("DELETE", p => `/storages/${p.id}`).returns(deleteStorageResponseSchema),
  postSpace: endpoint("POST", "/spaces")
    .withBody<{ name: string; size: number; description: string; storageId: string }>()
    .returns(z.object({
      id: z.string(),
      name: z.string(),
      size: z.number(),
      description: z.string(),
      storageId: z.string(),
    })),
};
