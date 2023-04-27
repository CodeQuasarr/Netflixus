<template>
    <div>
        <div class="container-fluid p-0 m-0 d-flex flex-wrap align-items-center justify-content-center">
            <div v-for="(poster, index) in movies.results" :key="`poster-action-${index}`" class="m-3">
                <THeMovieItem :poster="poster"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import THeMovieItem from "@/components/posters/THeMovieItem.vue";
import {MovieDetails} from "@/helpers/types/MovieType";

export default defineComponent({
    name: "TheMoviesCard",
    components: {THeMovieItem},
    props: {
        movies: {
            type: Object as () => MovieDetails,
            required: true,
        },
    },
});
</script>

<style scoped>
</style>
