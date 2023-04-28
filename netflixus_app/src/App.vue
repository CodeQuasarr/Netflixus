<template>
    <div style="min-height: 100vh" class="font-lato bg-netflixus">
        <RouterView />
    </div>

</template>
<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
})

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Roboto+Serif:wght@300&display=swap');

.bg-netflixus {
    background-color: #060D17 !important;
}
.font-lato {
    font-family: 'Lato', sans-serif;
    font-family: 'Roboto Serif', serif;
}
.fs-16 {
    font-size: 16px !important;
}
.fs-28 {
    font-size: 28px !important;
}
.fw-400 {
    font-weight: 600 !important;
}
.fw-600 {
    font-weight: 600 !important;
}
.fw-700 {
    font-weight: 700 !important;
}
.fw-800 {
    font-weight: 800 !important;
}
.fw-900 {
    font-weight: 900 !important;
}
.text-6a7c8f {
    color: #6a7c8f !important;
}
.text-b9bdcc {
    color: #b9bdcc !important;
}
</style>
