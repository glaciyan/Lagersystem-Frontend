import { api, endpoint } from "./core";
import { Storage } from "./types.ts";

export const endpoints = {
  getStorages: endpoint("GET", "/storages").withQuery<{ depth?: number }>().returns(Storage),
  getStorage: endpoint<{ id: string }>("GET", p => `/storage/${p.id}`).returns(Storage),
};

const result = api.exec(endpoints.getStorage, {
  params: {
    id: "123123",
  },
});

result.then(res => res.data);

const result2 = api.exec(endpoints.getStorages, {
  query: {
    depth: 1,
  },
});

result2.then(res => res.data);
