import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/Auth.vue"),
    },
    {
      path: "/compte",
      name: "compte",
      component: () => import("../views/Compte.vue"),
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem("token")) {
          next();
        } else {
          next("/auth");
        }
      },
      children: [
        {
          path: "/parametres",
          name: "parametres",
          component: () => import("../views/Params.vue"),
        },
      ],
    },
    // {
    //   path: "/:pathMatch(.*)*",
    //   name: "not-found",
    //   component: () => import("../views/NotFound.vue"),
    // },
  ],
});

export default router;
