import { endpoint } from "./core";
import { z } from "zod";

const Storage = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  spaces: z.array(z.any()),
  subStorages: z.array(z.any()),
});

export const endpoints = {
  getStorages: endpoint("GET", "/storages").withQuery<{ depth: number }>().returns(Storage),
};
