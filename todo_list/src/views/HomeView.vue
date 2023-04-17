<template>
    <div class="col">
        <!-- Log by username -->
        <div style="min-height: 80vh" v-if="!is_logged"
             class=" w-100 h-100 d-flex align-items-center justify-content-center">

            <h1 class="text-danger fw-bold">TodoList</h1>
            <div class="col-md-5">
                <h1 class="h2 fw-bold ">Créez votre profil</h1>
                <div class="col">
                    <div class="input-group mb-3">
                    <span class="input-group-text text-danger" id="basic-addon1">
                        <font-awesome-icon :icon="['fas', 'paper-plane']"/>
                    </span>
                        <input v-model="username" type="text" class="form-control form-control-lg"
                               placeholder="votre nom">
                    </div>
                    <button :disabled="username_input_is_empty" @click="is_logged = true"
                            class="btn btn-danger col-12 py-2 fw-bold text-white">
                        Continuer
                    </button>
                </div>
            </div>
        </div>
        <!-- End Log by username -->
        <!-- Todolist content -->
        <div v-else>
            <nav class="navbar navbar-expand-lg bg-danger">
                <div class="container-fluid">
                    <a class="navbar-brand me-5" href="#">TodoList</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <form class="d-flex col-9 mx-auto" role="search">
                            <input class="form-control rounded-5" type="search" placeholder="Recherche"
                                   aria-label="Search">
                        </form>
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="#">{{ username }}</a>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>

            <div class="col col-md-7 mx-auto ">
                <!-- filter -->
                <div class="d-flex justify-content-between">
                    <h2 class="h4 fw-bold">Aujourd'hui</h2>
                    <button @click="filter_is_open = !filter_is_open" class="btn btn-sm btn-light float-end">
                        <font-awesome-icon :icon="['fas', 'tasks']"/>
                        <span class="fw-medium">Vue</span>
                    </button>
                </div>
                <div v-show="filter_is_open" class="card card-body col-5 float-end mt-">
                    <p class="h6 fw-bold">Trier par</p>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>

                </div>
                <!-- filter -->
                <hr class="mt-1">
                <!-- Add task -->
                <div class="card">
                    <div class="card-body task">
                        <div class="task-name">
                            <input class=" form-control" type="text" placeholder="Nom de la tâche">
                        </div>
                        <div class="task-description">
                            <textarea placeholder="Description" class="form-control" id="" rows="1"></textarea>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="dropdown">
                                <button class="btn border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown button
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item text-secondary" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Add task -->
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
            username: "Samsonite",
            is_logged: true,
            filter_is_open: false,

            selectedOption: '',
            options: [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
                { label: 'Option 4', value: 'option4' },
            ]
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
li a {
    color: #fff !important;
}

.form-control {
    border: 1px solid #DC3545 !important;
}

.task .form-control {
    border: none !important;
}

.task .form-control:focus {
    box-shadow: none !important;
}
.task .task-name .form-control::placeholder {
    color: #999999;
    font-weight: 600;
}

.task .task-description .form-control::placeholder {
    color: #cbc8c8;
    font-weight: 600;
}

.dropdown-item {
    color: #090909 !important;
}
</style>