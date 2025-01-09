import CreateDepot from "./components/Create/CreateDepot.vue";
import Index from "./pages/Index.vue";

import title from "./title";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Index,
    meta: {
      title: title("Home"),
    },
  },
  {
    path: "/storage/create",
    component: CreateDepot,
    meta: {
      title: title("Creating Depot"),
    },
  },
  {
    path: "/storage/:id",
    name: "Depot",
    component: () => import("./pages/StorageDisplay.vue"),
    meta: {
      title: title("Depot"),
    },
  },
  {
    path: "/storage/:id/newstorage",
    component: () => import("./pages/NewStorage.vue"),
    meta: {
      title: title("Creating Storage"),
    },
  },
  {
    path: "/storage/:id/newspace",
    component: () => import("./pages/NewSpace.vue"),
    meta: {
      title: title("Creating Storage"),
    },
  },
  {
    path: "/product/create",
    component: () => import("./pages/NewProduct.vue"),
    meta: {
      title: title("Creating Storage"),
    },
  },
  {
    path: "/product/assign",
    component: () => import("./pages/AssignProduct.vue"),
    meta: {
      title: title("Creating Storage"),
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("./pages/NotFound.vue"),
    meta: {
      title: title("Not Found"),
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ? savedPosition : { top: 0, left: 0 };
  },
});

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
