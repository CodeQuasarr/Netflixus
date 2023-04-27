<template>
    <div>
        <div class="mt-5">
            <div class="filter d-flex align-items-center">
                <div class="container d-flex align-items-center justify-content-between">
                    <div class="col-2 d-flex">
                        <TheMovieFilter
                                @data-selected="selectedGenre = $event"
                                :datas="genresList"
                                title="GENRES"
                        />
                        <TheMovieFilter
                                @data-selected="selectedLanguage = $event"
                                :selectedLanguage="selectedLanguage"
                                :datas="languagesList"
                                title="LANGUES"
                        />
                        <TheMovieFilter
                                @data-selected="selectedYear = $event"
                                :datas="yearsList"
                                title="DATES"
                        />
                    </div>
                    <div class="col">
                        <button @click="reset()" class="btn btn-sm  btn-link link-light text-decoration-none float-end">rénitialiser</button>
                    </div>

                </div>
            </div>

            <TheMoviesCard :movies="movies"/>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {Helpers} from "@/helpers/index.service";
import TheMoviesCard from "@/components/posters/TheMoviesCard.vue";
import MovieService from "@/helpers/services/Movie.service";
import {MovieDetails} from "@/helpers/types/MovieType";
import TheMovieFilter from "@/components/TheMovieFilter.vue";

export default defineComponent({
    name: "IndexView",
    components: {TheMovieFilter, TheMoviesCard},
    data() {
        return {
            yearsList: Helpers.yearsList,
            genresList: Helpers.genreList,
            languagesList: Helpers.languagesList,

            selectedGenre: null,
            selectedLanguage: null,
            selectedYear: null,
            movies: [] as MovieDetails,
        };
    },
    watch: {
        selectedLanguage (val: string|null) { this.getMovies(this.selectedGenre, val); },
        selectedGenre(val: number|null) { this.getMovies(val); },
        selectedYear(val: number|null) { this.getMovies(this.selectedGenre, this.selectedLanguage, val); }
    },
    methods: {
        getMovies(genreID: number|null, language: string|null = null, year: number|null = null) {
            MovieService.getMoviesByGenre(genreID, language, year).then((response: MovieDetails) => {
                this.movies = response;
            }).catch((error) => {
                console.error(error);
            });
        },
        reset() {
            this.selectedYear = null;
            this.selectedGenre = null;
            this.selectedLanguage = null;

            this.getMovies(null);
        }
    },
    mounted() {
        this.getMovies(null);
    },
});
</script>

<style scoped>
.form-control-sm {
    background-color: #0A151F;
    color: #acacac;
    border: none;
}
</style>
