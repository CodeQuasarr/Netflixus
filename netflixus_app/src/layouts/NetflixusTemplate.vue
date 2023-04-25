<template>
    <div>
        <TheHeader
                :search-bar-is-open="searchBarIsOpen"
                @search="search = $event"
                @search-results="handleSearchResults"
                @search-bar-toggle="searchBarIsOpen = !searchBarIsOpen"
        />
        <div class="container-fluid m-0 p-0 text-white">
            <template v-if="searchBarIsOpen">
                <div class="container-fluid p-0 m-0 d-flex flex-wrap align-items-center justify-content-center">

                    <div v-for="(poster, index) in searchResults.results" :key="`poster-action-${index}`" class="poster-img m-2">
                        <div class="swiper-slide-overlay">
                            <div class="position-absolute top-50 start-50 translate-middle">
                                <button class="btn btn-sm btn-warning "><i class="fas fa-tv"></i> Regarder</button>
                            </div>
                        </div>
                        <img v-if="poster.poster_path" :src="`https://image.tmdb.org/t/p/w500${poster.poster_path}`" class="img-fluid" alt="...">
                    </div>

                </div>
            </template>
            <template v-else>
                <RouterView/>
            </template>
        </div>
        <footer></footer>
    </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";

export default {
    name: "NetflixusTemplate",
    components: {TheHeader},
    data() {
        return {
            searchBarIsOpen: false,
            searchResults: {},
            search: '',
        };
    },
    methods: {
        handleSearchResults(results) {
            return this.searchResults = results;
        }
    },
};
</script>
<style scoped>
.poster-img {
    position: relative;
    width: 190px;
    height: 270px;
}

.swiper-slide-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.swiper-slide-overlay:hover {
    background-color: rgba(7, 15, 26, 0.85) !important;
}
.poster-img img {
    width: 100%;
    height: 100%;
}
</style>
