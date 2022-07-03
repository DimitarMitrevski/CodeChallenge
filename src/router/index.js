import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
  },
  {
    path: "/new/challenge",
    name: "NewChallenge",
    component: () => import("../views/NewChallenge.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/edit/:id",
    name: "EditChallenge",
    component: () => import("../views/EditChallenge.vue"),
  },
  {
    path: "/challenge/:id",
    name: "ChallengeView",
    component: () => import("../views/ChallengeView.vue"),
  },
  {
    path: "/join/challenge",
    name: "JoinChallenge",
    component: () => import("../views/JoinChallenge.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
