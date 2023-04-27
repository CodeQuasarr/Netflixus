<template>
    <div>
        <div class="container-fluid p-0 m-0 d-flex flex-wrap align-items-center justify-content-center">
            <div v-for="(poster, index) in tvShows.results" :key="`poster-action-${index}`" class="m-3">
                <TvShowItem :poster="poster"/>
            </div>
        </div>
        <ThePagination
            :movies="movies"
            @page-clicked="onClickHandler"
        />
    </div>
</template>

<script lang="ts">
import TvShowItem from "@/components/tv-shows/TvShowItem.vue";
import {TvShowDetails} from "@/helpers/types/TvShowType";
import {defineComponent} from "vue";
import ThePagination from "@/components/ThePagination.vue";
export default defineComponent({
    name: "TvShowsCard",
    components: {ThePagination, TvShowItem},
    props: {
        tvShows: {
            type: Object as () => TvShowDetails,
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
            this.$emit("current-page", page);
        },
    },
})
</script>

<style scoped>

</style>