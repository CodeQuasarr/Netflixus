<template>
  <div style="background-color: #fff9f3; min-height: 100vh" class="container-fluid">
      <div class="container py-3">
          <h1 class="text-danger fw-bold">TodoList</h1>
          <HomeView />
      </div>
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
