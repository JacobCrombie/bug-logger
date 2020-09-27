import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Bugs from "../Pages/Bugs.vue";
// @ts-ignore
import Profile from "../Pages/Profile.vue";
// @ts-ignore
import ActiveBug from "../Pages/ActiveBug.vue"
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Bugs",
    component: Bugs,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard,
  },
  {
    path: "/bugs/:id",
    name: "ActiveBug",
    component: ActiveBug,
    beforeEnter: authGuard,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
