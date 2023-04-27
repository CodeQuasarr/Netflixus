<template>
    <div>
        <TheHeader
                class="fixed-top"
                :search-bar-is-open="searchBarIsOpen"
                @search="search = $event"
                @search-results="handleSearchResults"
                @search-bar-toggle="searchBarIsOpen = !searchBarIsOpen"
        />

        <div style="margin-top: 85px !important;" class="container-fluid m-0 px-0 text-white">
            <template v-if="$store.getters.searchBarIsOpen">
                <TvShowsCard :tv-shows="searchResults"
                             v-if="$route.path.name=== '/tv-shows'"/>
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

export default defineComponent({
    name: "NetflixusTemplate",
    components: {TheMoviesCard, TvShowsCard, TheHeader},
    data() {
        return {
            searchBarIsOpen: false,
            searchResults: {} as MovieDetails,
            search: '',
            currentPage: 1 as number,
        };
    },
    methods: {
        handleSearchResults(results: MovieDetails) {
            return this.searchResults = results;
        }
    },
});
</script>
<style scoped>

</style>
