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

            <div class="col col-md-5 mx-auto my-5 ">
                <!-- filter -->
                <div class="d-flex justify-content-between">
                    <h2 style="font-family: 'Questrial', sans-serif;" class="h4 fw-bold">Aujourd'hui</h2>
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
                <!-- Add task -->
                <div v-if="tasks.length > 0">
                    <TheTasks :tasks="tasks" />
                </div>
                <div class="card rounded rounded-3 border-black my-4">
                    <div class="card-body task">
                        <div class="task-name mb-0">
                            <input v-model="task.title" class=" form-control form-control-sm" type="text" placeholder="Nom de la tâche">
                        </div>
                        <div class="task-description">
                            <textarea v-model="task.description" placeholder="Description" class="form-control form-control-sm" id="" rows="1"></textarea>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="d-flex align-items-center">
                                <div class="dropdown">
                                    <button class="btn btn-sm border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span v-show="task.priority === 'P1'" class="text-danger"><font-awesome-icon :icon="['fas', 'flag']" /></span>
                                        <span v-show="task.priority === 'P2'" class="text-warning"><font-awesome-icon :icon="['fas', 'flag']" /></span>
                                        <span v-show="task.priority === 'P3'" class="text-primary"><font-awesome-icon :icon="['fas', 'flag']" /></span>
                                        <span v-show="task.priority === 'Priorité'" class="text-secondary"><font-awesome-icon :icon="['fas', 'flag']" /></span>
                                        {{ task.priority }}
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li v-for="(priority, index) in priorities" :key="index">
                                            <a class="dropdown-item text-secondary" @click="changePriority(priority)">
                                                {{ priority.label }}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="mx-2 dropdown">
                                    <button class="btn btn-sm border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <font-awesome-icon :icon="['fas', 'clock']" class="text-secondary"/> {{ task.hour ? task.hour+' h' : 'Durée' }}
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><input v-model="task.hour" type="number" min="1" max="10" class="form-control form-control-sm" ></li>
                                    </ul>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-sm border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span v-show="task.label === 'To Do'" class="text-secondary"><font-awesome-icon :icon="['fas', 'tag']"/></span>
                                        <span v-show="task.label === 'In Progress'" class="text-warning"><font-awesome-icon :icon="['fas', 'tag']" /></span>
                                        <span v-show="task.label === 'In Review'" class="text-danger"><font-awesome-icon :icon="['fas', 'tag']" /></span>
                                        <span v-show="task.label === 'Done'" class="text-primary"><font-awesome-icon :icon="['fas', 'tag']" /></span>
                                        {{ task.label ?? 'Étiquette' }}
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li v-for="(label, index) in labels" :key="index">
                                            <a class="dropdown-item text-secondary" @click="changeLabel(label)">
                                                {{ label.label }}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr class="border border-light-subtle">
                        <div class="d-flex align-items-center justify-content-end my-0 py-0">
                            <button class="btn btn-sm btn-outline-primary mx-2">Annuler</button>
                            <button @click="createTask()" class="btn btn-sm btn-outline-danger">Ajouter une tâche</button>
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
import { createToaster } from "@meforma/vue-toaster";
import TheTasks from "@/components/TheTasks.vue";

const toaster = createToaster({ position: 'top' });
export default {
    name: "HomeView",
    components: {TheTasks},
    data() {
        return {
            global_id: 1,
            all_timer: 0,
            username_input_is_empty: true,
            username: "Samsonite",
            is_logged: false,
            filter_is_open: false,

            selectedOption: '',
            options: [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
                { label: 'Option 4', value: 'option4' },
            ],
            priorities: [
                { label: 'Priorité 1', value: "P1" },
                { label: 'Priorité 2', value: 'P2' },
                { label: 'Priorité 3', value: 'P3' },
                { label: 'Priorité 4', value: 'Priorité' },
            ],
            labels: [
                { label: 'To do', value: 'To Do' },
                { label: 'In progress', value: "In Progress" },
                { label: 'Done', value: 'Done' },
                { label: 'In review', value: 'In Review' },
            ],
            task: {
                id: 1,
                title: '',
                hour: null,
                label: 'To Do',
                description: '',
                priority: 'Priorité',
                comments: [],
            },
            tasks: [],
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
    methods: {
        changePriority(priority) {
            this.task.priority = priority.value;
        },
        changeLabel(label) {
            this.task.label = label.value;
        },
        createTask() {
            console.log(typeof this.task.hour)
            // validation form
            if (this.task.title.trim().length === 0) {
                toaster.error('Le champ titre ne peut pas être vide')
                return;
            }
            if (this.task.hour === null || typeof this.task.hour !== 'number') {
                toaster.error("La durée de la tâche n'est pas valide")
                return;
            }
            if (this.task.hour > 10) {
                toaster.error("La durée de la tâche ne peut pas être supérieure à 10h")
                return;
            }
            if (this.all_timer > 10) {
                toaster.error("La durée des tâches ne peuvent pas être supérieure à 10h")
                return;
            }
            if (this.tasks.length > 3) {
                toaster.error("Vous ne pouvez pas créer plus de 3 tâches")
                return;
            }

            this.tasks.push(this.task)
            this.global_id++;
            this.all_timer += this.task.hour;
            this.task = {
                id: this.global_id,
                title: '',
                hour: null,
                label: 'To Do',
                description: '',
                priority: 'Priorité',
                comments: [],
            }
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');
h2 {
    font-family: 'Oswald', sans-serif;
    font-size: 20px;
    font-weight: 700
}
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
    font-size: 14px;
    font-weight: 600;
    font-style: normal;
    font-variant: none;
    text-transform: none;
    text-decoration: none solid rgba(0, 0, 0, 0.88);
}

.task .task-description .form-control::placeholder {
    color: #cbc8c8;
    font-weight: 600;
}
.task .task-description .form-control {
    color: #000000;
    font-weight: 200;
}
.task .task-name .form-control {
    color: #000000;
    font-weight: 600;
}

.dropdown-item {
    color: #090909 !important;
}
</style>
