<template>
    <div>
        <TheHeader />
        <div class="container-fluid m-0 p-0">
            <RouterView />
        </div>
        <footer></footer>
    </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";

export default {
    name: "NetflixusTemplate",
    components: {TheHeader}
}
</script>

<style scoped>

</style>
