<template>
    <div>
        <div class="mt-5">
            <PeopleCard :people="people" @current-page="currentPage = $event"/>
        </div>
    </div>
</template>

<script lang="ts">
import PeopleCard from "@/components/people/PeopleCard.vue";
import PeopleService from "@/helpers/services/People.service";
import {PeopleDetails} from "@/helpers/types/PeopleType";
import {defineComponent} from "vue";
export default defineComponent({
    name: "IndexView",
    components: {PeopleCard},
    data() {
        return {
            people: [] as unknown as PeopleDetails,
            currentPage: 1 as number,
        };
    },
    watch: {
        currentPage(val: number) { this.getPeople(val); },
    },
    methods: {
        getPeople(currentPage: number) {
            PeopleService.getPopularPeople(currentPage).then((response: PeopleDetails) => {
                this.people = response;
            }).catch((error) => {
                console.error(error);
            });
        },
    },
    mounted() {
        this.getPeople(this.currentPage);
    }
})
</script>

<style scoped>

</style>