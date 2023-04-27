<template>
    <div>

        <TheHeader
                class="fixed-top"
                :search-bar-is-open="searchBarIsOpen"
                @search="search = $event"
                @search-results="handleSearchPeopleResults"
                @search-bar-toggle="searchBarIsOpen = !searchBarIsOpen"
                v-if="$route.path === '/people'"/>
        <TheHeader class="fixed-top"
                   :search-bar-is-open="searchBarIsOpen"
                   @search="search = $event"
                   @search-results="handleSearchResults"
                   @search-bar-toggle="searchBarIsOpen = !searchBarIsOpen"
                   v-else/>

        <div style="margin-top: 85px !important;" class="container-fluid m-0 px-0 text-white">
            <template v-if="$store.getters.searchBarIsOpen">
                <TvShowsCard :tv-shows="searchResults"
                             v-if="$route.path === '/tv-shows'"/>
                <PeopleCard :people="searchResultsPeople"
                            v-else-if="$route.path === '/people'"/>
                <TheMoviesCard :movies="searchResults"
                               v-else/>
            </template>
            <template v-else>
                <RouterView/>
            </template>
        </div>
        <footer></footer>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TheHeader from "@/components/TheHeader.vue";
import {MovieDetails} from "@/helpers/types/MovieType";
import TvShowsCard from "@/components/tv-shows/TvShowsCard.vue";
import TheMoviesCard from "@/components/posters/TheMoviesCard.vue";
import PeopleCard from "@/components/people/PeopleCard.vue";
import {PeopleDetails} from "@/helpers/types/PeopleType";
import router from "@/router";

export default defineComponent({
    name: "NetflixusTemplate",
    components: {TheMoviesCard, TvShowsCard, PeopleCard, TheHeader},
    data() {
        return {
            searchBarIsOpen: false,
            searchResults: {} as MovieDetails,
            searchResultsPeople: {} as PeopleDetails,
            search: '',
            currentPage: 1 as number,
        };
    },
    methods: {
        router() {
            return router
        },
        handleSearchResults(results: MovieDetails) {
            return this.searchResults = results;
        },
        handleSearchPeopleResults(results: PeopleDetails) {
            return this.searchResultsPeople = results;
        },
    },
});
</script>
<style scoped>

</style>
