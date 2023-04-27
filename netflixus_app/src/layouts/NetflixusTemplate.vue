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
                <TheMoviesCard :movies="searchResults" />
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

export default defineComponent({
    name: "NetflixusTemplate",
    components: {TheMoviesCard, TheHeader},
    data() {
        return {
            searchBarIsOpen: false,
            searchResults: {},
            search: '',
            currentPage: 1 as number,
        };
    },
    methods: {
        handleSearchResults(results) {
            return this.searchResults = results;
        }
    },
});
</script>
<style scoped>

</style>
