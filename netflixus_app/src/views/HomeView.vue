<template>
    <div v-for="(poster, index) in posters" :key="`poster-card-${index}`">
        <ThePosterCard  :posters="poster"/>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
// Import Movies Service
import MovieService from '@/helpers/services/Movie.service';
import {MovieDetailsWithGenre} from "@/helpers/types/MovieType";
import ThePosterCard from "@/components/posters/ThePosterCard.vue";

export default defineComponent({
    name: 'HomeView',
    components: { ThePosterCard },
    data() {
        return {
            posters : {} as MovieDetailsWithGenre[],
        };
    },
    methods: {
        /**
         * @description Fetch posters by genre from API and save them in the store
         * @returns void
         */
        getPosters(): void {
            if (this.$store.getters.posters.length === 0) {
                MovieService.getMovieByGenders().then((response: MovieDetailsWithGenre[]) => {
                    this.$store.dispatch('addAllPosters', response);
                    this.posters = response;
                });
            } else {
                this.posters = this.$store.getters.posters;
            }
        },
    },
    mounted() {
        this.getPosters();
    }
});
</script>
<style>
.swiper-slide {
    transition: 250ms all;
}

.swiper-slide:hover {
    transform: scale(1.2);
}

.swiper-slide img {
    width: 100%;
    height: 100%;
}
</style>
