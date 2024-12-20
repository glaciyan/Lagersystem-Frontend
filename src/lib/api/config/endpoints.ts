import { z } from "zod";
import { endpoint } from "../endpoint.ts";
import { Storage } from "../types.ts";

export const endpoints = {
  getStorages: endpoint("GET", "/storages").withQuery<{ depth?: number }>().returns(z.array(Storage)),
  getStorage: endpoint<{ id: string }>("GET", p => `/storage/${p.id}`).returns(Storage),
  postStorage: endpoint("POST", "/storages").withBody<{ name: string; description: string; parentId?: string }>().returns(Storage),
};
