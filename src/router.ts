import Index from "./pages/Index.vue";
import TestPage from "./pages/TestPage.vue";

import title from "./title";
import { createRouter, createWebHistory } from "vue-router";

// Define all routes here
const routes = [
  {
    path: "/",
    component: Index,
    meta: {
      title: title("Home"),
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
  {
    path: "/test",
    component: TestPage,
    meta: {
      title: title("Test"),
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
  // Take the optional title value from the route and set it as the page title
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
