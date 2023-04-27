<template>
    <div>
        <div class="mt-5">
            <div class="filter d-flex align-items-center">
                <div class="container d-flex align-items-center justify-content-between">
                    <div class="col-2 d-flex">
                        <TvShowFilter title="GENRES" @data-selected="selectedGenre = $event" :datas="genresList"/>
                        <TvShowFilter title="LANGUES" @data-selected="selectedLanguage = $event"
                                      :datas="languagesList"/>
                        <TvShowFilter title="DATES"
                                      @data-selected="selectedYear = $event" :datas="yearsList"/>
                    </div>
                    <div class="col">
                        <button @click="reset()" class="btn btn-sm  btn-link link-light text-decoration-none float-end">
                            rénitialiser
                        </button>
                    </div>
                </div>
            </div>
            <TvShowsCard :tvShows="tvShows"/>
        </div>
    </div>
</template>

<script lang="ts">
import TvShowFilter from "@/components/tv-shows/TvShowFilter.vue";
import TvShowsCard from "@/components/tv-shows/TvShowsCard.vue";
import {TvShowDetails} from "@/helpers/types/TvShowType";
import TvShowService from "@/helpers/services/TvShow.service";
import {Helpers} from "@/helpers/index.service";
import {defineComponent} from "vue";

export default defineComponent({
    name: "IndexView",
    components: {TvShowFilter, TvShowsCard},
    data() {
        return {
            yearsList: Helpers.yearsList,
            genresList: Helpers.genreList,
            languagesList: Helpers.languagesList,

            selectedGenre: null,
            selectedLanguage: null,
            selectedYear: null,
            tvShows: [] as TvShowDetails,
        };
    },
    watch: {
        selectedLanguage(val: string | null) {this.getTvShows(this.selectedGenre, val);},
        selectedGenre(val: number | null) {this.getTvShows(val, null);},
        selectedYear(val: number | null) {this.getTvShows(this.selectedGenre, this.selectedLanguage, val);},
    },
    methods: {
        getTvShows(genreID: number | null, language: string | null, year: number|null = null) {
            TvShowService.getTvShowsByGenre(genreID, language, year)
                .then((response: TvShowDetails) => {
                    this.tvShows = response;
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        },
        reset() {
            this.selectedGenre = null;
            this.selectedLanguage = null;
            this.selectedYear = null;
            this.getTvShows(null, null, null);
        }
    },
    mounted() {
        this.getTvShows(null, null, null);
    }
})
</script>

<style scoped>
.form-control-sm {
    background-color: #0A151F;
    color: #acacac;
    border: none;
}

</style>