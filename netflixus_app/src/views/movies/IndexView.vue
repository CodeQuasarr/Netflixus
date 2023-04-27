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

            <TheMoviesCard
                    @current-page="currentPage = $event"
                    :movies="movies"
            />
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

            currentPage: 1 as number,
        };
    },
    watch: {
        currentPage(val: number) { this.getMovies(val); },
        selectedGenre(val: number|null) { this.getMovies(this.currentPage, val); },
        selectedLanguage (val: string|null) { this.getMovies(this.currentPage, this.selectedGenre, val); },
        selectedYear(val: number|null) { this.getMovies(this.currentPage, this.selectedGenre, this.selectedLanguage, val); }
    },
    methods: {
        getMovies(currentPage: number,genreID: number|null = null, language: string|null = null, year: number|null = null) {
            MovieService.getMoviesByGenre(this.currentPage, genreID, language, year).then((response: MovieDetails) => {
                this.movies = response;
            }).catch((error) => {
                console.error(error);
            });
        },
        reset() {
            this.selectedYear = null;
            this.selectedGenre = null;
            this.selectedLanguage = null;

            this.getMovies(this.currentPage);
        }
    },
    mounted() {
        this.getMovies(this.currentPage);
    },
});
</script>

<style scoped>

</style>
