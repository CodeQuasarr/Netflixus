<template>
    <div>
        <div class="container-fluid p-0 m-0 d-flex flex-wrap align-items-center justify-content-center">
            <div v-for="(poster, index) in movies.results" :key="`poster-action-${index}`" class="m-3 slide ">
                <THeMovieItem :poster="poster"/>
            </div>
        </div>
        <ThePagination
                :movies="movies"
                @page-clicked="onClickHandler"
        />
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import THeMovieItem from "@/components/posters/THeMovieItem.vue";
import {MovieDetails} from "@/helpers/types/MovieType";
import ThePagination from "@/components/ThePagination.vue";

export default defineComponent({
    name: "TheMoviesCard",
    components: {ThePagination, THeMovieItem},
    props: {
        movies: {
            type: Object as () => MovieDetails,
            required: true,
        },
    },
    data() {
        return {
            currentPage: 1,
        };
    },
    methods: {
        onClickHandler(page: number) {
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
