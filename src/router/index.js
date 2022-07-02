import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Dashboard from "../views/Dashboard.vue";
import NewChallenge from "../views/NewChallenge.vue";
import Profile from "../views/Profile.vue";
import EditChallenge from "../views/EditChallenge.vue";
import ChallengeView from "../views/ChallengeView.vue";
import JoinChallenge from "../views/JoinChallenge.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/new/challenge",
    name: "NewChallenge",
    component: NewChallenge,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/edit/:id",
    name: "EditChallenge",
    component: EditChallenge,
  },
  {
    path: "/challenge/:id",
    name: "ChallengeView",
    component: ChallengeView,
  },
  {
    path: "/join/challenge",
    name: "JoinChallenge",
    component: JoinChallenge,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
