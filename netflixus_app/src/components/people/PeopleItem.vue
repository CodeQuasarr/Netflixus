<template>
    <div class="poster-img">
        <div @mouseover="peopleIsHoverID = people.id" @mouseleave="peopleIsHoverID = 0" class="swiper-slide-overlay">
            <div class="position-absolute top-50 start-50 translate-middle">
                <RouterLink
                        v-if="peopleIsHoverID === people.id"
                        :to="{ name: 'PEOPLE_ID', params: { id: this.people.id } }"
                        class="btn btn-sm btn-warning "
                >
                    <i class="fas fa-tv"></i> Regarder
                </RouterLink>
            </div>
        </div>
        <img v-if="people.profile_path" :src="`https://image.tmdb.org/t/p/w500${people.profile_path}`" class="img-fluid"
             alt="...">
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Cast} from "@/helpers/types/MovieType";

export default defineComponent({
    name: "PeopleItem",
    props: {
        people: {
            type: Object as () => Cast,
            required: true
        },
    },
    data() {
        return {
            peopleIsHoverID: 0,
        };
    },
    methods: {
        handleSearch() {
            this.$router.push({name: 'PEOPLE', params: {id: this.people.id}});
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
