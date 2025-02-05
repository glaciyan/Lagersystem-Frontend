import { z } from "zod";
import { endpoint } from "../lib/api/endpoint.ts";
import { Space, Storage, Product, ProductArray, StoredProduct, BreadcrumbPath } from "./types.ts";

export const endpoints = {
  getStorages: endpoint("GET", "/v1/storages").withQuery<{ depth?: number }>().returns(z.array(Storage)),
  getStorage: endpoint<{ id: string }>("GET", p => `/v1/storages/${p.id}`).returns(Storage),
  postStorage: endpoint("POST", "/v1/storages").withBody<{ name: string; description: string; parentId?: string }>().returns(Storage),
  deleteStorage: endpoint<{ id: string }>("DELETE", p => `/v1/storages/${p.id}`).returns(Storage),
  postSpace: endpoint("POST", "/v1/spaces").withBody<{ name: string; totalSize: number; unit: string; description: string; storageId: string }>().returns(Space),
  deleteSpace: endpoint<{ id: string }>("DELETE", p => `/v1/spaces/${p.id}`).returns(Space),
  postProduct: endpoint("POST", "/v1/products").withBody<{ name: string; description: string; unit: string; size: number }>().returns(Product),
  getProducts: endpoint("GET", `/v1/products`).returns(ProductArray),
  deleteProduct: endpoint<{ id: string }>("DELETE", p => `/v1/products/${p.id}`).returns(Product),
  postStoredProducts: endpoint("POST", "/v1/storedProducts").withBody<{ productId: string; spaceId: string; quantity: number }>().returns(StoredProduct),
  breadcrumb: endpoint<{ id: string }>("GET", p => `/v1/breadcrumb/${p.id}`).returns(BreadcrumbPath),
};
