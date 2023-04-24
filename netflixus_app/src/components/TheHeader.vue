<template>
    <div>
        <header>
            <nav style="min-height: 85px;" class="navbar navbar-expand-lg navbar-dark bg-netflixus-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">NETFLIXUS</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item" v-for="link in links" :key="`link-${link.index}`">
                                <template v-if="link.index === 5 && $store.getters.isAuthenticated">
                                    <RouterLink :to="link.path" class="nav-link active" aria-current="page"> {{ link.name }} </RouterLink>
                                </template>
                                <template v-if="link.index !== 5">
                                    <RouterLink :to="link.path" class="nav-link active" aria-current="page"> {{ link.name }} </RouterLink>
                                </template>

                            </li>
                        </ul>
                        <div class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Titre, Personnage, Genre" aria-label="Search">
                            <button class="btn btn-outline-danger" type="submit"> <font-icon icon="close" /> </button>
                        </div>
                        <div v-if="$store.getters.isAuthenticated" class="dropdown">
                            <button class="btn btn-link dropdown-toggle text-decoration-none text-uppercase text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Samsoniteuu
                            </button>
                            <ul class="dropdown-menu bg-netflixus-dark">
                                <li> <RouterLink to="/" class="dropdown-item" href="#">Compte</RouterLink></li>
                                <li> <RouterLink to="/" class="dropdown-item" href="#">Aide</RouterLink></li>
                                <li><hr class="dropdown-divider bg-danger"></li>
                                <li><button class=" btn btn-black dropdown-item" href="#">Se Déconnecter</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "TheHeader",
    data() {
        return {
            links: [
                {index: 1, name: "Acceuil",   path: "/"},
                {index: 2, name: "Films",     path: "/movies"},
                {index: 3, name: "Series",    path: "/series"},
                {index: 4, name: "Nouvautés", path: "/latest"},
                {index: 5, name: "Ma Listes", path: "/favory"},
            ]
        };
    },
});
</script>

<style scoped>
.bg-netflixus-dark {
    background-color: #060D17 !important;
}
.navbar-brand {
    font-family: 'Martian Mono', monospace;
    font-size: 25px;
    font-weight: 400;
    color: #e50914;
    text-decoration: none solid rgb(229, 9, 20);
    text-align: start;
}
.nav-link, .dropdown-item {
    color: #e5e5e5 !important;
    margin-right: 20px;
    font-weight: 400;
    text-decoration: none solid rgb(218, 217, 217);
    font-family: 'Roboto Serif', serif;
}
.nav-link:hover, .dropdown-item:hover {
    color: #b3b3b3 !important;
    text-decoration: none solid rgb(179, 179, 179);
}
a.router-link-active {
    color: #e50914 !important;
    text-decoration: none solid rgb(229, 9, 20);
}
</style>
