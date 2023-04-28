<template>
    <div style="min-height: 100vh" class="container-fluid p-0 m-0">
        <div class="text-white" v-if="Object.keys(movie).length > 0">
            <div class="col-12 movie-banner">
                <div class="movie-banner-overlay "></div>
                <img v-if="movie.backdrop_path"
                     :src="`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}`"
                     alt="...">
            </div>
            <TheMovieInformation :casts="casts" :movie="movie" :videoKey="videoKey"/>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import MovieService from "@/helpers/services/Movie.service";
import {Cast, MovieCredits, MovieDetail} from "@/helpers/types/MovieType";
import TheMovieInformation from "@/components/TheMovieInformation.vue";

export default defineComponent({
    name: "MovieView",
    components: {TheMovieInformation},
    data() {
        return {
            movie: {} as MovieDetail,
            casts: {} as Cast[],
            videoKey: "",
            rating: 4,
        };
    },
    methods: {

        /**
         * @description Get movie by id from route params
         *              Get movie, video and credits
         * @return void
         */
        init(): void {
            const movieID = this.$route.params.id as string;
            this.getMovie(movieID);
            this.getVideo(movieID);
            this.getMovieCredits(movieID);
        },

        /**
         * @description Get movie by id
         * @param movieID
         * @return void
         */
        getMovie(movieID: string): void {
            MovieService.getMovieById(movieID)
                .then((response: MovieDetail) => {
                    this.movie = response;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        /**
         * @description Get movie credits by movie id
         * @param movieID
         * @return void
         */
        getMovieCredits(movieID: string): void {
            MovieService.getMovieCredits(movieID)
                .then((response: MovieCredits) => {
                    this.casts = response.cast.slice(0, 12);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        /**
         * @description Get movie video by movie id
         * @param movieID
         * @return void
         */
        getVideo(movieID: string): void {
            MovieService.getMovieVideoKey(movieID)
                .then((response) => {
                    this.videoKey = response;
                })
                .catch((error) => {
                    console.log(error);
                });
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
    font-size: 16px !important;
}
.rating {
    unicode-bidi: bidi-override;
    direction: rtl;
    text-align: center;
}

.rating span {
    font-size: 30px;
    display: inline-block;
    position: relative;
    width: 1.1em;
    cursor: pointer;
}

.rating span:before {
    content: '★';
    position: absolute;
    opacity: 0;
}

.rating span:hover:before,
.rating span.star-filled:before {
    opacity: 1;
}

.rating span.star-filled:before {
    color: #FFD700;
}
</style>
