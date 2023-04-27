<template>
    <div>
        <div class="mt-5">
            <div class="filter d-flex align-items-center">
                <div class="container d-flex align-items-center justify-content-between">
                    <div class="col-2 d-flex">
                        <TheMovieFilter title="GENRES"
                                        @data-selected="selectedGenre = $event"
                                        :datas="genresList"
                        />
                        <TheMovieFilter title="LANGUES"
                                        @data-selected="selectedLanguage = $event"
                                        :datas="languagesList"
                        />
                        <!--                        <TheMovieFilter-->
                        <!--                            @data-selected="selectedYear = $event"-->
                        <!--                            :datas="yearsList"-->
                        <!--                            title="DATES"-->
                        <!--                        />-->
                    </div>
                    <div class="col">
                        <button @click="reset()" class="btn btn-sm  btn-link link-light text-decoration-none float-end">
                            rénitialiser
                        </button>
                    </div>
                </div>
            </div>
            <TvShowsCard :tvShows="tvShows" @current-page="currentPage = $event"
            />
        </div>
    </div>
</template>

<script lang="ts">
import TheMovieFilter from "@/components/TheMovieFilter.vue";
import TvShowsCard from "@/components/tv-shows/TvShowsCard.vue";
import {TvShowDetails} from "@/helpers/types/TvShowType";
import TvService from "@/helpers/services/Tv.service";
import {Helpers} from "@/helpers/index.service";
import {defineComponent} from "vue";
import TheMoviesCard from "@/components/posters/TheMoviesCard.vue";

export default defineComponent({
    name: "IndexView",
    components: {TheMovieFilter, TvShowsCard},
    data() {
        return {
            yearsList: Helpers.yearsList,
            genresList: Helpers.genreList,
            languagesList: Helpers.languagesList,

            selectedGenre: null,
            selectedLanguage: null,
            selectedYear: null,
            tvShows: [] as TvShowDetails,
            currentPage: 1 as number,
        };
    },
    watch: {
        currentPage(val: number) {
            this.getTvShows(val);
        },
        selectedGenre(val: number | null) {
            this.getTvShows(this.currentPage, val);
        },
        selectedLanguage(val: string | null) {
            this.getTvShows(this.currentPage, this.selectedGenre, val);
        },
        selectedYear(val: number | null) {
            this.getTvShows(this.currentPage, this.selectedGenre, this.selectedLanguage, val);
        },
    },
    methods: {
        getTvShows(currentPage: number, genreID: number | null = null, language: string | null = null, year: number | null = null) {
            TvService.getTvShowsByGenre(this.currentPage, genreID, language, year)
                .then((response: TvShowDetails) => {
                    this.tvShows = response;
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        },
        reset() {
            this.selectedLanguage = null;
            this.selectedGenre = null;
            this.selectedYear = null;
            this.getTvShows(this.currentPage);
        }
    },
    mounted() {
        this.getTvShows(this.currentPage);
    }
})
</script>

<style scoped>

</style>