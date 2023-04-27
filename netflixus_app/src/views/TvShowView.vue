<template>
    <div class="container-fluid p-0 m-0">
        <div class="text-white" v-if="Object.keys(tvShow).length > 0">
            <div class="col-12 movie-banner">
                <div class="movie-banner-overlay ">
                    <div class="container d-flex flex-wrap justify-content-center justify-content-around">
                        <div v-if="tvShow.poster_path"
                             style="width: 300px; min-height: 450px !important; margin-top: 20px">
                            <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${tvShow.poster_path}`"
                                 alt="..." class="img-fluid">
                        </div>
                        <div class="col-12 col-lg-8 my-5">
                            <h1>{{ tvShow.name }}</h1>
                            <div class="mb-3">
                                <span>{{ tvShow.first_air_date }}</span>
                                <span> • </span>
                                <span v-for="(genre, index) in tvShow.genres" :key="`genre-${index}`">{{ genre.name }}
                                    <span v-if="index < tvShow.genres.length - 1">,</span>
                                </span>
                                <span> • </span>
                                <span> {{ convertNumberToHours(tvShow.episode_run_time[0]) }} </span>
                            </div>
                            <h2 class="h3">Synopsis</h2>
                            <p class="clamp">{{ tvShow.overview }}</p>

                            <h2 class="h3">Langues</h2>
                            <span v-for="(langue, index) in tvShow.spoken_languages"
                                  :key="`langue-${index}`">{{ langue.name }}
                                    <span v-if="index < tvShow.spoken_languages.length - 1"> • </span>
                                </span>
                        </div>
                    </div>
                </div>
                <img v-if="tvShow.backdrop_path"
                     :src="`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${tvShow.backdrop_path}`"
                     alt="..." class="img-fluid">
            </div>
            <div v-if="tvShow.belongs_to_collection" class="container mt-5">
                <h2 class="mb-3">Médias</h2>
                <div class="d-flex align-items-center justify-content-center">
                    <div v-if="videoKey" class="col">
                        <iframe width="100%" height="315px" :src="`https://www.youtube.com/embed/${videoKey}`"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen></iframe>
                    </div>
                    <div class="col">
                        <img class="w-100" height="315"
                              :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${tvShow.poster_path}`"
                              alt="...">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TvShowService from "@/helpers/services/TvShow.service";
import {TvShowDetail} from "@/helpers/types/TvShowType";

export default defineComponent({
    name: "TvShowView",
    data() {
        return {
            tvShow: {} as TvShowDetail,
            videoKey: "",

        };
    },
    methods: {
        init() {
            const tvShowID = this.$route.params.id as string;
            this.getTvShow(tvShowID);
            this.getVideo(tvShowID);
        },
        getTvShow(tvShowID: string) {
            TvShowService.getTvShowById(tvShowID)
                .then((response: TvShowDetail) => {
                    this.tvShow = response;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getVideo(tvShowID: string) {
            TvShowService.getTvShowVideoKey(tvShowID)
                .then((response) => {
                    this.videoKey = response;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        convertNumberToHours(number: number) {
            const hours = Math.floor(number / 60);
            const minutes = number % 60;
            return `${hours}h ${minutes}m`;
        },
    },
    mounted() {
        this.init()
    }
})
</script>

<style scoped>
.movie-banner {
    position: relative;
    width: 100%;
    height: 510px;
}

.movie-banner-overlay {
    background-color: rgba(7, 15, 26, 0.75) !important;
    position: absolute;
    width: 100%;
    height: 100%;
}

.movie-banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 0.5rem;
}

.clamp {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>