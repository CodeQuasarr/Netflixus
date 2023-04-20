<template>
    <div style="min-height: 100vh" class="container-fluid p-0 m-0">
        <HomeView/>
        <div></div>
    </div>
</template>

<script>
import HomeView from "@/views/HomeView.vue";

export default {
    name: 'App',
    components: {
        HomeView,
    }
}
</script>

<style>

</style>
