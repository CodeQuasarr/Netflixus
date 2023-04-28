import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import NetflixusTemplate from "@/layouts/NetflixusTemplate.vue";
import MovieView from "@/views/movies/MovieView.vue";
import IndexView from "@/views/movies/IndexView.vue";
import TvShowView from "@/views/tv-shows/TvShowView.vue";
import PeopleView from "@/views/people/PeopleView.vue";

const routes: Array<RouteRecordRaw> = [
    {path: '/login', name: 'LOGIN', component: LoginView},
    {
        path: '/',
      redirect: '/',
      component: NetflixusTemplate,
      children: [
            {path: '/', name: 'HOME', component: HomeView},
            {path: '/movies/:id', name: 'MOVIES_ID', component: MovieView},
            {path: '/movies', name: 'MOVIES', component: IndexView},
            {path: '/tv-shows', name: 'TV_SHOWS', component: () => import('@/views/tv-shows/IndexView.vue')},
            {path: '/tv-shows/:id', name: 'TV_SHOWS_ID', component: TvShowView},
            {path: '/people', name: 'PEOPLE', component: () => import('@/views/people/IndexView.vue')},
            {path: '/people/:id', name: 'PEOPLE_ID', component: PeopleView},
        ]
    },
    // { path: "/:pathMatch(.*)*", name: "NOT_FOUND", component: PageNotFoundVew },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {
            top: 0,
            left: 0,
            behavior: 'smooth'
        }
    }
})

export default router
