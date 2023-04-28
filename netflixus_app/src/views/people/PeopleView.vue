<template>
    <div class="container-fluid p-0 m-0">
        <div class="text-white" v-if="Object.keys(people).length > 0">
            <div class="col-12 movie-banner">
                <div class="movie-banner-overlay ">
                    <div class="container d-flex flex-wrap justify-content-center justify-content-around">
                        <div class="d-none d-md-block col-md-4 col-lg-3">
                            <img :src="`https://image.tmdb.org/t/p/w500${people.profile_path}`" alt="people"
                                 class="img-fluid rounded"/>
                        </div>
                        <div class="col-12 col-md-8 col-lg-9 my-5">
                            <h1>{{ people.name }}</h1>
                            <div class="mb-3">
                                <span>{{ people.birthday }}</span>
                                <span> • </span>
                                <span>{{ people.place_of_birth }}</span>
                            </div>
                            <h2 class="h3">Biographie</h2>
                            <p class="clamp">{{ people.biography }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {PeopleDetail} from "@/helpers/types/PeopleType";
import PeopleService from "@/helpers/services/People.service";

export default defineComponent({
    name: "PeopleView",
    data() {
        return {
            people: {} as PeopleDetail,
        };
    },
    methods: {
        init() {
            const peopleID = this.$route.params.id as string;
            this.getPeople(peopleID);
        },
        getPeople(peopleID: string) {
            PeopleService.getPeopleById(peopleID)
                .then((response: any) => {
                    this.people = response;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
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