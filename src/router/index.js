import { createRouter, createWebHistory } from "vue-router";
import AuthView from "@/views/AuthView.vue";
import MainView from "@/views/MainView.vue";
import DefaultView from "@/views/DefaultView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { useMainStore } from "@/store/mainStore";

const routes = [
  {
    path: "/auth",
    name: "auth",
    component: AuthView,
    meta: { requiredAuth: false },
  },
  {
    path: "/",
    component: DefaultView,
    name: "default",
    redirect: { name: "main" },
    meta: { requiredAuth: true },
  },
  {
    path: "/main",
    name: "main",
    component: MainView,
    meta: { requiredAuth: true },
  },
  {
    path: "/:notFound(.*)*",
    name: "not-found",
    component: NotFoundView,
    meta: { requiredAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
    const store = useMainStore();
    if(to.meta.requiredAuth === true) {
        if(store.isAuth === true) {
          next();
        } 
        else {
          next({ name: 'auth' });
        }
    } 
    next();
});

export default router;
