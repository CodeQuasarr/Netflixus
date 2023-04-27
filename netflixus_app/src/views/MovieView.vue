<template>
    <div class="container-fluid p-0 m-0">
        <div class="text-white" v-if="Object.keys(movie).length > 0">
            <div class="col-12 movie-banner">
                <div class="movie-banner-overlay ">
                    <div class="container d-flex flex-wrap justify-content-center justify-content-around">
                        <div class="d-none d-md-block" v-if="movie.poster_path"
                             style="width: 300px; min-height: 450px !important; margin-top: 20px">
                            <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`"
                                 alt="..." class="img-fluid">
                        </div>
                        <div class="col-12 col-lg-8 my-5">
                            <h1>{{ movie.title }}</h1>
                            <div class="mb-3">
                                <span>{{ movie.release_date }}</span>
                                <span> • </span>
                                <span v-for="(genre, index) in movie.genres" :key="`genre-${index}`">{{ genre.name }}
                                    <span v-if="index < movie.genres.length - 1">,</span>
                                </span>
                                <span> • </span>
                                <span> {{ convertNumberToHours(movie.runtime) }} </span>
                            </div>
                            <h2 class="h3">Synopsis</h2>
                            <p class="clamp">{{ movie.overview }}</p>

                            <h2 class="h3">Langues</h2>
                            <span v-for="(langue, index) in movie.spoken_languages"
                                  :key="`langue-${index}`">{{ langue.name }}
                                    <span v-if="index < movie.spoken_languages.length - 1"> • </span>
                                </span>
                        </div>
                    </div>
                </div>
                <img v-if="movie.backdrop_path"
                     :src="`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}`"
                     alt="...">
            </div>
            <div v-if="movie.belongs_to_collection" class="container mt-5">
                <h2 class="mb-3">Médias</h2>
                <div class="d-flex align-items-center justify-content-center">
                    <div v-if="videoKey" class="col">
                        <iframe width="100%" height="315" :src="`https://www.youtube.com/embed/${videoKey}`"
                                title="YouTube video player" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; " allowfullscreen></iframe>
                    </div>
                    <div class="col">
                        <img class="w-100" height="315"
                             :src="`https://www.themoviedb.org/t/p/w533_and_h300_bestv2/${movie.belongs_to_collection.backdrop_path}`"
                             alt="">
                    </div>
                </div>
            </div>
            <div>
                <div class="mt-5">
                    <h2 class="mb-3">Acteurs</h2>
                    <div class="container-fluid p-0 m-0 d-flex flex-wrap align-items-center justify-content-center">
                        <div v-for="cast in movie.credits.cast" :key="`cast-${cast.id}`" class="m-3 ">
                            <PeopleItem :people="cast"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import MovieService from "@/helpers/services/Movie.service";
import {MovieDetail} from "@/helpers/types/MovieType";
import PeopleItem from "@/components/people/PeopleItem.vue";

export default defineComponent({
    name: "MovieView",
    components: {PeopleItem},
    data() {
        return {
            movie: {} as MovieDetail,
            videoKey: "",
        };
    },
    methods: {
        init() {
            // movie id from route params and type casting to string
            const movieID = this.$route.params.id as string;
            this.getMovie(movieID);
            this.getVideo(movieID);
            this.getMovieCredits(movieID);
        },
        getMovie(movieID: string) {
            MovieService.getMovieById(movieID)
                .then((response: MovieDetail) => {
                    this.movie = response;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        getMovieCredits(movieID: string) {
            MovieService.getMovieCredits(movieID)
                .then((response: any) => {
                    this.movie.credits = response;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        getVideo(movieID: string) {

            MovieService.getMovieVideoKey(movieID)
                .then((response) => {
                    this.videoKey = response;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        convertDate(date: string) {
            const dateObj = new Date(date);
            return dateObj.toLocaleDateString();
        },
        convertNumberToHours(number: number) {
            const hours = Math.floor(number / 60);
            const minutes = number % 60;
            return `${hours}h ${minutes}m`;
        },
    },
    mounted() {
        this.init()
    },
});
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
