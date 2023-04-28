<template>
    <div>
        <TheHeader
                class="fixed-top"
                :search-bar-is-open="searchBarIsOpen"
                @search="search = $event"
                @search-results="handleSearchResults"
                @search-bar-toggle="searchBarIsOpen = !searchBarIsOpen"
                :current-page="currentPage"
        />

        <div style="margin-top: 85px !important;" class="container-fluid m-0 px-0 text-white">
            <template v-if="$store.getters.searchBarIsOpen">
                <TheMoviesCard
                        @current-page="currentPage = $event"
                        :movies="searchResults"
                />
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
import TheMoviesCard from "@/components/posters/TheMoviesCard.vue";
import {SearchMovies} from "@/helpers/types/MovieType";

export default defineComponent({
    name: "NetflixusTemplate",
    components: {TheMoviesCard, TheHeader},
    data() {
        return {
            searchBarIsOpen: false,
            searchResults: {} as SearchMovies,
            search: '',
            currentPage: 1 as number,
        };
    },
    methods: {
        handleSearchResults(results: SearchMovies) {
            return this.searchResults = results;
        }
    },
    watch: {
        currentPage(val: number) {
            console.log(val);
            this.currentPage = val;
            },
    }
});
</script>
<style scoped>

</style>
