<template>
    <div class="poster-img">
        <div class="d-none d-md-block">
            <div @touchstart="posterIsHoverID = poster.id" @mouseover="posterIsHoverID = poster.id" @mouseleave="posterIsHoverID = 0" class="swiper-slide-overlay">
                <div class="position-absolute top-50 start-50 translate-middle">
                    <RouterLink
                            v-if="posterIsHoverID === poster.id"
                            :to="{ name: 'MOVIES_ID', params: { id: this.poster.id } }"
                            class="btn btn-sm btn-warning "
                    >
                        <i class="fas fa-tv"></i> Regarder
                    </RouterLink>
                </div>
            </div>
            <img v-if="poster.poster_path" :src="`https://image.tmdb.org/t/p/w500${poster.poster_path}`" class="img-fluid" alt="...">
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {MovieDetail, Poster} from "@/helpers/types/MovieType";
export default defineComponent({
    name: "THeMovieItem",
    props: {
        poster: {
            type: Object as () => Poster | MovieDetail,
            required: true,
        },
    },
    data() {
        return {
            posterIsHoverID: 0,
        };
    },
    methods: {
        handleSearch() {
            console.log('poster', this.poster.id)
            this.$router.push({name: 'MOVIES', params: {id: this.poster.id } });
        }
    },
});
</script>

<style scoped>
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
.poster-img {
    position: relative;
    width: 190px;
    height: 270px;
}

.poster-img img {
    width: 100%;
    height: 100%;
}
</style>
