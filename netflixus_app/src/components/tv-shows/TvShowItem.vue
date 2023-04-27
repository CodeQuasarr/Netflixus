<template>
    <div class="poster-img">
        <div @mouseover="posterIsHoverID = poster.id" @mouseleave="posterIsHoverID = 0" class="swiper-slide-overlay">
            <div class="position-absolute top-50 start-50 translate-middle">
                <RouterLink
                        v-if="posterIsHoverID === poster.id"
                        :to="{ name: 'TV_SHOWS_ID', params: { id: this.poster.id } }"
                        class="btn btn-sm btn-warning "
                >
                    <i class="fas fa-tv"></i> Regarder
                </RouterLink>
            </div>
        </div>
        <img v-if="poster.poster_path" :src="`https://image.tmdb.org/t/p/w500${poster.poster_path}`" class="img-fluid"
             alt="...">
    </div>
</template>


<script lang="ts">
import {defineComponent} from 'vue';
import {Poster, TvShowDetail} from "@/helpers/types/TvShowType";

export default defineComponent({
    name: "TvShowItem",
    props: {
        poster: {
            type: Object as () => Poster | TvShowDetail,
            required: true
        },
    },
    data() {
        return {
            posterIsHoverID: 0,
        };
    },
    methods: {
        handleSearch() {
            this.$router.push({name: 'TV_SHOWS', params: {id: this.poster.id}});
        }
    },
})
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