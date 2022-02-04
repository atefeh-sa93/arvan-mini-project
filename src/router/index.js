import Vue from "vue";
import VueRouter from "vue-router";
import Articles from "../views/Articles/Index.vue";
import EditArticle from "../views/Articles/EditArticle.vue";
import NewArticle from "../views/Articles/NewArticle.vue";
import Home from "../views/Home.vue";
import OnlyRouterView from "@/components/OnlyRouterView";
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: { name: "Login" },
  },
  {
    path: "/articles",
    props: true,
    component: OnlyRouterView,
    children: [
      {
        path: "",
        name: "Articles",
        component: Articles,
      },
      
    ]
  },
  {
    path: "/create",
    name: "NewArticle",
    component: NewArticle,
  },
  {
    path: "/edit/:slug",
    name: "EditArticle",
    component: EditArticle,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
