<template>
    <div v-if="movies.results">
        <div class="container-fluid p-0 m-0 d-flex flex-wrap align-items-center justify-content-center">
            <div v-for="(poster, index) in movies.results" :key="`poster-action-${index}`" class="m-3 slide ">
                <THeMovieItem :poster="poster"/>
            </div>
        </div>
        <ThePagination
                :movies="movies"
                @page-clicked="pageCLiked"
        />
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import THeMovieItem from "@/components/posters/THeMovieItem.vue";
import {MovieDetails, SearchMovies} from "@/helpers/types/MovieType";
import ThePagination from "@/components/ThePagination.vue";

export default defineComponent({
    name: "TheMoviesCard",
    components: {ThePagination, THeMovieItem},
    props: {
        movies: {
            type: Object as () => SearchMovies | MovieDetails,
            required: true,
        },
    },
    data() {
        return {
            currentPage: 1,
        };
    },
    methods: {
        /**
         * @description Handle the click on the pagination
         * @param page
         */
        pageCLiked(page: number) {
            this.currentPage = page;
            this.$emit("current-page", page);
        },
    },
});
</script>

<style scoped>
.slide {
    transition: 250ms all;
}

.slide:hover {
    transform: scale(1.2);
}
</style>
