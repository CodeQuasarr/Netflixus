<template>
    <div>
        <TheIntro v-show="!isVisible"/>
        <transition name="fade">
        <div v-show="isVisible" class="login">
            <div class="login-overlay">
                <div class="login-content d-flex align-items-center justify-content-center">
                    <div style="background: rgba(0, 0, 0, 0.8);" class="p-5 col-12 col-md-6 col-lg-3 mx-auto">
                        <div style="z-index: 999999" class="text-light p-5">

                            <input v-model="user.pseudo" type="text" class="form-control form-control-lg my-4" placeholder="Pseudo">
                            <input v-model="user.password" type="password" class="form-control form-control-lg" placeholder="Mot de passe">
                            <button @click="logUser()" class="col-12 btn btn-danger btn-lg btn-block my-5">Se connecter</button>

                            <p style="font-size: 11px" class="text-center">
                                Cette page est protégée par Google CAPTCHA. <RouterLink to="/" >En savoir plus</RouterLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </transition>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import TheIntro from "@/components/TheIntro.vue";

export default defineComponent({
    name: "LoginView",
    components: {TheIntro},
    data() {
        return {
            isVisible: false,
            user: {
                pseudo: "",
                password: ""
            },
        };
    },
    methods: {
        logUser() {
            // check if pseudo is string
            // if yes, redirect to home
            console.log(this.user.pseudo);
            if ( typeof this.user.pseudo === "string" ) {
                this.$toast.success("Veuillez remplir tous les champs");
            } else {
                this.$toast.error("Veuillez remplir tous les champs");
            }



            // this.$router.push({name: "HomeView"});
        }
    },
    mounted() {
        setTimeout(() => {
            this.isVisible = true;
        }, 4000);
    },
});
</script>

<style scoped>
.login {
    width: 100%;
    height: 100vh;
    background: url("https://www.notebookcheck.biz/fileadmin/Notebooks/News/_nc3/netflixteaser.png") no-repeat center center fixed;
    background-size: cover;
}

.login-overlay {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
}

.login-content {
    height: 100%;
    width: 100%;
    z-index: 9999;
}
.form-control {
    background: #343434;
    color: #fff;
    border: none;
}

.form-control:focus {
    background: #343434;
    color: #fff;
    border: none;
    box-shadow: none;
}
.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 0.5s ease;
}

.slide-up-enter,
.slide-up-leave-to {
    transform: translateY(100%);
}

</style>
