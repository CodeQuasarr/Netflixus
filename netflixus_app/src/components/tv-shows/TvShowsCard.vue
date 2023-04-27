<template>
  <div>
        <div class="container-fluid p-0 m-0 d-flex flex-wrap align-items-center justify-content-center">
            <div v-for="(poster, index) in tvShows.results" :key="`poster-action-${index}`" class="m-3">
                <TvShowItem :poster="poster"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import TvShowItem from "@/components/tv-shows/TvShowItem.vue";
import {TvShowDetails} from "@/helpers/types/TvShowType";
import {defineComponent} from "vue";
export default defineComponent({
    name: "TvShowsCard",
    components: {TvShowItem},
    props: {
        tvShows: {
            type: Object as () => TvShowDetails,
            required: true,
        },
    },
})
</script>

<style scoped>

</style>