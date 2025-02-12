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
    path: "/storage/:id",
    component: () => import("./pages/StorageDisplay.vue"),
    meta: {
      title: title("Storage"),
    },
  },
  {
    path: "/search",
    component: () => import("./pages/Search.vue"),
    meta: {
      title: title("Searching"),
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
