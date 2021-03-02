import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Datamodel from "../views/Datamodel.vue"
import Ontology from "../views/Ontology.vue"
import Valueset from "../views/Valueset.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/datamodel/:selectedIri",
    name: "Datamodel",
    component: Datamodel
  },
  {
    path: "/ontology/:selectedIri",
    name: "Ontology",
    component: Ontology
  },
  {
    path: "/valueset/:selectedIri",
    name: "Valueset",
    component: Valueset
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
