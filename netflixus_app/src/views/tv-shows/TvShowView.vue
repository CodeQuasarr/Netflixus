<template>
    <div style="min-height: 100vh" class="container-fluid p-0 m-0">
        <div class="text-white" v-if="Object.keys(tvShow).length > 0">
            <div class="col-12 movie-banner">
                <div class="movie-banner-overlay "></div>
                <img v-if="tvShow.backdrop_path"
                     :src="`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${tvShow.backdrop_path}`"
                     alt="...">
            </div>
            <TheMovieInformation :casts="casts" :movie="tvShow" :videoKey="videoKey"/>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TvService from "@/helpers/services/Tv.service";
import {TvShowDetail} from "@/helpers/types/TvShowType";
import PeopleItem from "@/components/people/PeopleItem.vue";
import TheMovieInformation from "@/components/TheMovieInformation.vue";
import {Cast, MovieCredits, MovieDetail} from "@/helpers/types/MovieType";

export default defineComponent({
    name: "TvShowView",
    components: {TheMovieInformation},
    data() {
        return {
            tvShow: {} as MovieDetail,
            videoKey: "",
            casts: {} as Cast[],
        };
    },
    methods: {
        /**
         * @description Get movie by id from route params
         *              Get movie, video and credits
         * @return void
         */
        init() {
            const tvShowID = this.$route.params.id as string;
            this.getTvShow(tvShowID);
            this.getVideo(tvShowID);
            this.getTvShowCredits(tvShowID);
        },

        /**
         * @description Get serie by id
         * @param tvShowID
         * @return void
         */
        getTvShow(tvShowID: string) {
            TvService.getTvShowById(tvShowID)
                .then((response: MovieDetail) => {
                    this.tvShow = response;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        /**
         * @description Get movie credits by movie id
         * @param tvShowID
         * @return void
         */
        getVideo(tvShowID: string) {
            TvService.getTvShowVideoKey(tvShowID)
                .then((response) => {
                    this.videoKey = response;
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        /**
         * @description Get movie video by movie id
         * @param tvShowID
         * @return void
         */
        getTvShowCredits(tvShowID: string) {
            TvService.getTvShowCredits(tvShowID)
                .then((response: MovieCredits) => {
                    this.casts = response.cast.slice(0, 12);
                })
                .catch((error) => {
                    console.log(error);
                });
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
