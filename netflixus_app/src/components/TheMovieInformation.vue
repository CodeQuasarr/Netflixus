<template>
    <div style="min-height: 100vh" class="bg-netflixus container-fluid position-absolute">
        <div style="margin-top: -120px;" class="container bg-netflixus shadow-lg p-3 mb-5 bg-body rounded py-5">
            <div class="container d-flex flex-wrap justify-content-center justify-content-around">
                <div class="d-none d-md-block" v-if="movie.poster_path"
                     style="width: 300px; min-height: 450px !important; margin-top: 20px">
                    <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`"
                         alt="..." class="img-fluid">

                    <div>
                        <div class="rating">
                                      <span v-for="n in 9"
                                            :key="n"
                                            :class="{ 'star-filled': n <= movie.vote_average, 'star-empty': n > movie.vote_average }"
                                      >
                                          ★
                                      </span>
                        </div>
                        <div class="mt-3">
                            <span class="fw-900 fs-16 text-6a7c8f mb-3">Date</span> : <span class="mb-3 fs-16 fw-400 text-b9bdcc">{{ movie.release_date }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-8 my-5">
                    <h1 class="fs-28 fw-600">{{ movie.title }}</h1>
                    <div class="mb-3 fs-16 fw-400 text-b9bdcc">
                        <div v-if="movie.release_date">{{ movie.release_date }}</div>
                        <span> • </span>
                        <span v-for="(genre, index) in movie.genres" :key="`genre-${index}`">{{ genre.name }}
                                    <span v-if="index < movie.genres.length - 1">,</span>
                                </span>
                        <span> • </span>
                        <span> {{ convertNumberToHours(movie.runtime) }} </span>
                    </div>
                    <h2 class="fw-900 fs-16 text-6a7c8f">Synopsis</h2>
                    <p class="clamp fs-16 fw-400 text-b9bdcc">{{ movie.overview }}</p>

                    <h2 class="fw-900 fs-16 text-6a7c8f">Langues</h2>
                    <span class="fs-16 fw-400 text-b9bdcc" v-for="(langue, index) in movie.spoken_languages"
                          :key="`langue-${index}`">{{ langue.name }}
                                    <span v-if="index < movie.spoken_languages.length - 1"> • </span>
                                </span>

                    <div v-if="movie.belongs_to_collection" class="container mt-5">
                        <h2 class="fw-900 fs-16 text-6a7c8f mb-3">Médias</h2>
                        <div class="d-flex align-items-center justify-content-center">
                            <div v-if="videoKey" class="col">
                                <iframe width="100%" height="315"
                                        :src="`https://www.youtube.com/embed/${videoKey}`"
                                        title="YouTube video player" frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; "
                                        allowfullscreen></iframe>
                            </div>
                            <div class="col">
                                <img class="w-100" height="315"
                                     :src="`https://www.themoviedb.org/t/p/w533_and_h300_bestv2/${movie.belongs_to_collection.backdrop_path}`"
                                     alt="">
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="container mt-5">
                            <h2 class="fw-900 fs-16 text-6a7c8f mb-3">Acteurs</h2>
                            <div class="container-fluid p-0 m-0 d-flex flex-wrap align-items-center justify-content-center">
                                <div v-for="cast in casts" :key="`cast-${cast.id}`" class="m-3 ">
                                    <PeopleItem :people="cast"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import PeopleItem from "@/components/people/PeopleItem.vue";
import { MovieDetail, Cast } from "@/helpers/types/MovieType";

export default defineComponent({
    name: "TheMovieInformation",
    props: {
        movie: {
            type: Object as () => MovieDetail,
            required: true
        },
        casts: {
            type: Object as () => Cast[],
            required: true
        },
        videoKey: {
            type: String,
            required: true
        }
    },
    components: {PeopleItem},
    methods: {

        /**
         * @description Convert number to hours
         * @param number
         * @return string
         */
        convertNumberToHours(number: number): string {
            const hours = Math.floor(number / 60);
            const minutes = number % 60;
            return `${hours}h ${minutes}m`;
        },
    }
});
</script>
<style scoped>
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
