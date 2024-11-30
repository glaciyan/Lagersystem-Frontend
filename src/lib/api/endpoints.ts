import { endpoint } from "./core";
import { Storage, StoragesResponse } from "./types.ts";

export const endpoints = {
  getStorages: endpoint("GET", "/storages").withQuery<{ depth?: number }>().returns(StoragesResponse),
  getStorage: endpoint<{ id: string }>("GET", p => `/storage/${p.id}`).returns(Storage),
};
