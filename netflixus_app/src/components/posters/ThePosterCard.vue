<template>
    <div class="mt-5">
        <div class="d-flex align-items-center justify-content-between">
            <h1 class="h3 fs-6 text-white text-uppercase">{{ posters.genre }}</h1>
            <RouterLink to="/" class="fs-6 btn btn-sm btn-close-white">Voir plus</RouterLink>
        </div>
        <swiper
                :modules="modules"
                :slides-per-view="7"
                :space-between="8"
                :slides-per-group="2"
                navigation
                :breakpoints="{
                    0: {
                        slidesPerView: 2,
                    },
                    503: {
                        slidesPerView: 3,
                    },
                    940: {
                        slidesPerView: 4,
                        spaceBetween: 4
                    },
                    1200: {
                        slidesPerView: 7,
                    },
                    1900: {
                        slidesPerView: 9,
                    },
                }"
                @swiper="onSwiper"
                @slideChange="onSlideChange"
        >
            <swiper-slide
                    v-for="(poster, index) in posters.results" :key="`poster-action-${index}`"
                    style="height: 270px" class="poster-img position-relative"
            >
                <div>
                    <div @mouseover="poster.isHover = true" @mouseleave="poster.isHover = false" class="swiper-slide-overlay">
                        <div class="position-absolute top-50 start-50 translate-middle">
                            <button v-if="poster.isHover" class="btn btn-sm btn-warning "><i class="fas fa-tv"></i> Regarder</button>
                        </div>
                    </div>
                    <img v-if="poster.poster_path" :src="`https://image.tmdb.org/t/p/w500${poster.poster_path}`" class="img-fluid" alt="...">
                </div>


            </swiper-slide>
        </swiper>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
// import Swiper core and required modules
import {Navigation, A11y} from 'swiper';

// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';
// Import Movies Service

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {MovieDetailsWithGenre} from "@/helpers/types/MovieType";

export default defineComponent({
    name: 'ThePosterCard',
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        posters: {
            type: Object as () => MovieDetailsWithGenre,
            required: true,
        },
    },
    setup() {
        const onSwiper = (swiper: void) => {
            console.log('slide change');
        };
        const onSlideChange = () => {
            console.log('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
            modules: [Navigation, A11y],
        };
    },
});
</script>
<style>
.swiper-slide {
    transition: 250ms all;
}

.swiper-slide:hover {
    transform: scale(1.1);
    cursor: pointer;
    background-color: rgba(7, 15, 26, 0.85) !important;
}

.swiper-slide-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.swiper-slide-overlay:hover {
    background-color: rgba(7, 15, 26, 0.85) !important;
}

.swiper-slide img {
    width: 100%;
    height: 100%;
}
</style>
