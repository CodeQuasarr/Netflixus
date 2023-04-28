<template>
    <div class="col-7">
        <div class="dropdown">
            <button class="btn btn-sm btn-link text-decoration-none dropdown-toggle link-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ selected ?? title }}
            </button>
            <ul class="dropdown-menu">
                <li v-for="data in datas" :key="`genre-${data.id}`">
                    <button @click="getSelected(data)" class="dropdown-item" > {{ data.name }} </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {Helpers} from "@/helpers/index.service";

export default defineComponent({
    name: "TheMovieFilter",
    props: {
        datas: {
            type: Array,
            required: true
        },
        title: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            genres: Helpers.genreList,
            selected: null,
            id: 28,
        };
    },
    methods: {
        getSelected(data: { name: null; id: never; }) {
            this.selected = data.name;
            this.$emit('data-selected', data.id);
        },
    },
});
</script>

<style scoped>
.link-secondary {
    font-size: 20px;
}
</style>
