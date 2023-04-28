<template>
    <div>
        <div class="py-5">
            <div class="filter d-flex align-items-center">
                <div class="container d-flex align-items-center justify-content-between mb-5">

                    <div class="col-2 d-flex">
                        <TheMovieFilter
                                @data-selected="selectedGenre = $event"
                                :datas="genresList"
                                :title="genreTitle"
                        />
                        <TheMovieFilter
                                @data-selected="selectedLanguage = $event"
                                :selectedLanguage="selectedLanguage"
                                :datas="languagesList"
                                title="Langues"
                        />
                        <TheMovieFilter
                                @data-selected="selectedYear = $event"
                                :datas="yearsList"
                                title="Date de sortie"
                        />
                    </div>

                    <div class="col">
                        <button @click="reset()" class="btn btn-sm link-secondary text-decoration-none float-end">
                            <font-icon icon="close"/> rénitialiser
                        </button>
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
            genreTitle: "GENRES",

            selectedGenre: null as number|null,
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
        },
        init() {
            if (this.$route.query.genre) {
                this.genreTitle = this.$route.query.genre as string;
                this.getMovies(this.currentPage, Helpers.getGenreID(this.$route.query.genre as string));
            } else {
                this.getMovies(this.currentPage);
            }
        }
    },
    mounted() {
        this.init();
    },
});
</script>

<style scoped>
.link-secondary{
    font-size: 20px;
}
</style>
