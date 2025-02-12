import { z } from "zod";
import { endpoint } from "../lib/api/endpoint.ts";
import { Space, Storage, Product, ProductArray, BreadcrumbPath, SearchResult, DontCare, StoredProductArray } from "./types.ts";

export const endpoints = {
  breadcrumb: endpoint<{ id: string }>("GET", p => `/v1/breadcrumb/${p.id}`).returns(BreadcrumbPath),
  search: endpoint("GET", "/v1/search").withQuery<{ q: string }>().returns(z.array(SearchResult)),

  // Storages
  getStorages: endpoint("GET", "/v1/storages").withQuery<{ depth?: number }>().returns(z.array(Storage)),
  getStorage: endpoint<{ id: string }>("GET", p => `/v1/storages/${p.id}`).returns(Storage),
  postStorage: endpoint("POST", "/v1/storages").withBody<{ name: string; description: string; parentId?: string }>().returns(Storage),
  deleteStorage: endpoint<{ id: string }>("DELETE", p => `/v1/storages/${p.id}`).returns(Storage),
  moveStorage: endpoint<{ id: string }>("PATCH", p => `/v1/storages/${p.id}/move`).withBody<{ newParentId: string }>().returns(Storage),
  updateStorage: endpoint<{ id: string }>("PATCH", p => `/v1/storages/${p.id}/update`).withBody<{ name: string; description: string }>().returns(Storage),

  // Spaces
  postSpace: endpoint("POST", "/v1/spaces").withBody<{ name: string; totalSize: number; unit: string; description: string; storageId: string }>().returns(Space),
  deleteSpace: endpoint<{ id: string }>("DELETE", p => `/v1/spaces/${p.id}`).returns(Space),
  moveSpace: endpoint<{ id: string }>("PATCH", p => `/v1/spaces/${p.id}/move`).withBody<{ targetStorageId: string }>().returns(Space),
  updateSpace: endpoint<{ id: string }>("PATCH", p => `/v1/spaces/${p.id}/update`).withBody<{ name: string; totalSize: number; description: string }>().returns(Space),

  // Products
  postProduct: endpoint("POST", "/v1/products").withBody<{ name: string; description: string; unit: string; size: number }>().returns(Product),
  getProducts: endpoint("GET", `/v1/products`).returns(ProductArray),
  deleteProduct: endpoint<{ id: string }>("DELETE", p => `/v1/products/${p.id}`).returns(Product),
  updateProduct: endpoint<{ id: string }>("PATCH", p => `/v1/products/${p.id}/update`).withBody<{ name: string; description: string; size: number }>().returns(Product),

  // Stored Products
  getStoredProductsFromSpace: endpoint<{ id: string }>("GET", p => `/v1/storedProducts/${p.id}`).returns(StoredProductArray),
  postStoredProducts: endpoint("POST", "/v1/storedProducts").withBody<{ productId: string; spaceId: string; quantity: number }>().returns(DontCare),
  updateStoredProduct: endpoint<{ id: string }>("PATCH", p => `/v1/storedProducts/${p.id}/update`).withBody<{ quantity: number }>().returns(DontCare),
  deleteStoredProducts: endpoint<{ id: string }>("DELETE", p => `/v1/storedProducts/${p.id}`).returns(DontCare),
};
