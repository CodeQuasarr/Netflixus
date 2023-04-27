<template>
    <div>
        <div class="container-fluid p-0 m-0 d-flex flex-wrap align-items-center justify-content-center">
            <div v-for="(poster, index) in movies.results" :key="`poster-action-${index}`" class="m-3">
                <THeMovieItem :poster="poster"/>
            </div>
        </div>
        <ThePagination
                :movies="movies"
                @page-clicked="onClickHandler"
        />
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import THeMovieItem from "@/components/posters/THeMovieItem.vue";
import {MovieDetails} from "@/helpers/types/MovieType";
import ThePagination from "@/components/ThePagination.vue";

export default defineComponent({
    name: "TheMoviesCard",
    components: {ThePagination, THeMovieItem},
    props: {
        movies: {
            type: Object as () => MovieDetails,
            required: true,
        },
    },
    data() {
        return {
            currentPage: 1,
        };
    },
    methods: {
        onClickHandler(page: number) {
            this.currentPage = page;
            console.log(page);
        },
    },
});
</script>

<style scoped>
.pagination-container {
    display: flex;
    column-gap: 10px;
}
.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}
.paginate-buttons:hover {
    background-color: #d8d8d8;
}
.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}
.active-page:hover {
    background-color: #2988c8;
}
</style>
