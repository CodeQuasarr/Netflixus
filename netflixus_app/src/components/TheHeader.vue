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
                                    <RouterLink :to="link.path" class="nav-link"> {{ link.name }}</RouterLink>
                                </template>
                                <template v-if="link.index !== 5">
                                    <RouterLink :to="link.path" class="nav-link"> {{ link.name }}</RouterLink>
                                </template>

                            </li>
                        </ul>
                        <div class="d-flex" role="search">
                            <input
                                    class="form-control me-2"
                                    type="search"
                                    placeholder="Titre, Personnage, Genre"
                                    aria-label="Search"
                                    v-model="searchQuery"
                                    @focus="openSearch()"
                                    @input="onInput"
                            />
                            <button
                                    v-if="searchBarIsOpen"
                                    class="btn btn-outline-danger"
                                    type="button"
                                    @click="closeSearch()"
                            >
                                <font-icon icon="close"/>
                            </button>
                        </div>
                        <div v-if="$store.getters.isAuthenticated" class="dropdown">
                            <button class="btn btn-link dropdown-toggle text-decoration-none text-uppercase text-white"
                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Samsoniteuu
                            </button>
                            <ul class="dropdown-menu bg-netflixus-dark">
                                <li>
                                    <RouterLink to="/" class="dropdown-item" href="#">Compte</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/" class="dropdown-item" href="#">Aide</RouterLink>
                                </li>
                                <li>
                                    <hr class="dropdown-divider bg-danger">
                                </li>
                                <li>
                                    <button class=" btn btn-black dropdown-item" href="#">Se Déconnecter</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import MovieService from "@/helpers/services/Movie.service";
import {MovieDetails} from "@/helpers/types/MovieType";
import TvService from "@/helpers/services/Tv.service";
import router from "@/router";
import PeopleService from "@/helpers/services/People.service";
import {PeopleDetails} from "@/helpers/types/PeopleType";

export default defineComponent({
    name: "TheHeader",
    props: {
        searchBarIsOpen: {
            type: Boolean,
            default: false,
        },
        searchResults: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            links: [
                {index: 1, name: "Acceuil", path: "/"},
                {index: 2, name: "Films", path: "/movies"},
                {index: 3, name: "Series", path: "/tv-shows"},
                {index: 4, name: "Acteurs", path: "/people"},
                {index: 5, name: "Ma Listes", path: "/favory"},
            ],
            searchQuery: "",
            results: {} as MovieDetails,
            resultsPeople: {} as PeopleDetails,
            timeout: 0
        };
    },
    methods: {
        onInput() {
            // Clear the previous timeout if there is one
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            // Set a new timeout to submit the input after 2 seconds
            this.timeout = setTimeout(() => {
                //this.handleSearch();
            }, 300);
        },
        openSearch() {
            if (!this.searchBarIsOpen) {
                this.$emit("search-bar-toggle", true);
                this.$store.commit("setSearchBarState", true);
            }
        },
        closeSearch() {
            if (this.searchBarIsOpen) {
                this.searchQuery = "";
                this.$emit("search-bar-toggle", false);
                this.$store.commit("setSearchBarState", false);
                this.$emit("search", "");
            }
        },
        handleSearch(query: string) {
            console.log(this.searchQuery)
            MovieService.getMoviesByQuery(query)
                .then((response: MovieDetails) => {
                    this.results = response;
                    this.$emit("search-results", response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        handleSearchTv(query: string) {
            TvService.getTvShowsByQuery(query)
                .then((response: MovieDetails) => {
                    this.results = response;
                    this.$emit("search-results", response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        handleSearchPeople(query: string) {
            PeopleService.getPeopleByQuery(query)
                .then((response: PeopleDetails) => {
                    this.resultsPeople = response;
                    this.$emit("search-results", response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    watch: {
        searchQuery(newQuery: string) {
            console.log(newQuery)
            if (newQuery.length === 0) {
                console.log('newQuery')
                this.$emit("search", '');
            } else {
                if (router.currentRoute.value.path === '/tv-shows') {
                    this.handleSearchTv(newQuery);
                } else if (router.currentRoute.value.path === '/people') {
                    this.handleSearchPeople(newQuery);
                } else {
                    this.handleSearch(newQuery);
                }
            }
        },
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
