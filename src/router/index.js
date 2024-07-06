import { createRouter, createWebHistory } from "vue-router";
import AuthView from "@/views/AuthView.vue";
import MainView from "@/views/MainView.vue";
import DefaultView from "@/views/DefaultView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { useMainStore } from "@/store/mainStore";
import AuthFormComp from "@/components/authView/authFormComp.vue";
import RegFormComp from "@/components/authView/regFormComp.vue";
import profileComp from "@/components/mainView/profile/profileComp.vue";
import messangerComp from "@/components/mainView/messanger/messangerComp.vue";
import usersComp from "@/components/mainView/users/usersComp.vue";

const routes = [
  {
    path: "/auth/",
    name: "auth",
    component: AuthView,
    meta: { requiredAuth: false },
    redirect: { name: "login" },
    children: [
      {
        path: "log-in",
        component: AuthFormComp,
        name: "login",
        meta: { requiredAuth: false },
      },
      {
        path: "log-up",
        component: RegFormComp,
        name: "logup",
        meta: { requiredAuth: false },
      },
    ],
  },
  {
    path: "/",
    component: DefaultView,
    name: "default",
    redirect: { name: "main" },
    meta: { requiredAuth: true },
  },
  {
    path: "/main/",
    name: "main",
    component: MainView,
    meta: { requiredAuth: true },
    children: [
      {
        path: "profile",
        component: profileComp,
        name: "profile",
        meta: { requiredAuth: true },
      },
      {
        path: "users",
        component: usersComp,
        name: "users",
        meta: { requiredAuth: true },
      },
      {
        path: "messanger",
        component: messangerComp,
        name: "messanger",
        meta: { requiredAuth: true },
      },
      {
        path: "messanger/:chatId",
        component: messangerComp,
        name: "chat",
        meta: { requiredAuth: true },
      },

    ],
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

// router.beforeEach((to, from, next) => {
//     const store = useMainStore();
//     const token = localStorage.getItem('token');
//     if(token) store.isAuth = true;
//     if(to.meta.requiredAuth === true) {
//         if(store.isAuth === true) {
//           next();
//         }
//         else {
//           next({ name: 'auth' });
//         }
//     }
//     next();
// });

export default router;
