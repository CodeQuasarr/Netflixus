<template>
    <div class="col">
        <!-- Log by username -->
        <div style="min-height: 80vh" v-if="!is_logged" class=" w-100 h-100 d-flex align-items-center justify-content-center">
            <div class="col-md-5">
                <h1 class="h2 fw-bold ">Créez votre profil</h1>
                <div class="col">
                    <div class="input-group mb-3">
                    <span class="input-group-text text-danger" id="basic-addon1">
                        <font-awesome-icon :icon="['fas', 'paper-plane']"/>
                    </span>
                        <input v-model="username" type="text" class="form-control form-control-lg" placeholder="votre nom">
                    </div>
                    <button :disabled="username_input_is_empty"  @click="is_logged = true" class="btn btn-danger col-12 py-2 fw-bold text-white">
                        Continuer
                    </button>
                </div>
            </div>
        </div>
        <!-- End Log by username -->
        <!-- Todolist content -->
        <div v-else>
            <h1 class="h2 fw-bold ">Bienvenue {{ username }}</h1>
            <div class="col-md-5">
                <button class="btn btn-danger col-12 py-2 fw-bold text-white">Continuer</button>
            </div>
        </div>
        <!-- End Todolist content -->
    </div>
</template>

<script>
export default {
    name: "HomeView",
    data() {
        return {
            username_input_is_empty: true,
            username: "",
            is_logged: false,
        };
    },
    watch: {
        /**
         * Watch username input
         * @rules: username must be at least 3 characters long
         * @param {string} newVal
         */
        username: function (newVal) {
            this.username_input_is_empty = newVal.trim().length === 0;
        },
    },
}
</script>

<style scoped>

</style>