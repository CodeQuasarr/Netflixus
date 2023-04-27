<template>
    <div class="example-five d-flex py-5">
        <vue-awesome-paginate
                class="mx-auto"
                :total-items="200"
                :current-page="1"
                :items-per-page="20"
                :max-pages-shown="5"
                :on-click="onClickHandler"
                v-model="currentPage"
        >
            <template #prev-button>
        <span>
          <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
          >
            <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/>
          </svg>
          Prev
        </span>
            </template>

            <template #next-button>
        <span>
          Next
          <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
          >
            <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/>
          </svg>
        </span>
            </template>
        </vue-awesome-paginate>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
// !!! CODESANBOX.IO doesn't support (SCRIPT SETUP), So I will use composition api for this example
export default defineComponent({
    name: "ThePagination",
    data() {
        return {
            currentPage: 1,
        };
    },
    methods: {
        onClickHandler(page: number) {
            this.currentPage = page;
            this.$emit("page-clicked", page);
        },
    },
});
</script>

<style>
.example-five .pagination-container {
    background-color: #f0f0f0;
    border-radius: 5px;
    padding: 10px 0px;
}

.example-five .paginate-buttons {
    width: 40px;
    height: 40px;
    margin-inline: 5px;
    cursor: pointer;
    border: none;
    background-color: transparent;
    border-radius: 2px;
}

.example-five .back-button {
    width: 70px;
}

.example-five .next-button {
    width: 70px;
}

.example-five .back-button svg {
    transform: rotate(180deg);
}

.example-five .active-page {
    background-color: #2980b9;
    color: #fff;
}

.example-five .paginate-buttons:hover {
    background-color: #e5e5e5;
}

.example-five .active-page:hover {
    background-color: #3b8cc3;
    color: #fff;
}

.example-five .back-button:active,
.example-five .next-button:active {
    background-color: #dedede;
}
</style>
