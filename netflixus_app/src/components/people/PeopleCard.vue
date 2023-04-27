<template>
<div>
    <div class="container-fluid p-0 m-0 d-flex flex-wrap align-items-center justify-content-center">
        <div v-for="(people, index) in people.results" :key="`poster-action-${index}`" class="m-3">
            <PeopleItem :people="people"/>
        </div>
    </div>
    <ThePagination
        :people="people"
        @page-clicked="onClickHandler"
    />
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ThePagination from "@/components/ThePagination.vue";
import PeopleItem from "@/components/people/PeopleItem.vue";
import {PeopleDetails} from "@/helpers/types/PeopleType";
export default defineComponent({
    name: "PeopleCard",
    components: {ThePagination, PeopleItem},
    props: {
        people: {
            type: Object as () => PeopleDetails,
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