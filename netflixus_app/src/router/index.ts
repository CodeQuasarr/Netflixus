import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import NetflixusTemplate from "@/layouts/NetflixusTemplate.vue";

const routes: Array<RouteRecordRaw> = [
    {path: '/login', name: 'LOGIN', component: LoginView},
    {
        path: '/',
      redirect: '/',
      component: NetflixusTemplate,
      children: [
            {path: '/', name: 'HOME', component: HomeView},
        ]
    },
    // { path: "/:pathMatch(.*)*", name: "NOT_FOUND", component: PageNotFoundVew },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
