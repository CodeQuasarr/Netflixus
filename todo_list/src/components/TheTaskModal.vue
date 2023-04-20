<template>
    <div>
        <button data-bs-toggle="modal" :data-bs-target="`#exampleModal-${task_id}`"
                class="btn btn-sm border text-secondary mx-1">
            <font-awesome-icon icon="edit"/>
        </button>
        <div class="modal fade" :id="`exampleModal-${task_id}`" tabindex="-1"
             :aria-labelledby="`exampleModalLabel-${task_id}`" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" :id="`exampleModalLabel-${task_id}`">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="task-name mb-0">
                            <input v-model="taskToUpdate.title" class=" form-control form-control-sm" type="text"
                                   placeholder="Nom de la tâche">
                        </div>
                        <div class="task-description">
                            <textarea v-model="taskToUpdate.description" placeholder="Description"
                                      class="form-control form-control-sm" id="" rows="1"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="updateTask()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Mettre à jour</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "TheTaskModal",
    props: {
        task_id: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            taskToUpdate: {},
            pile: {},
        }
    },
    methods: {
        init() {
            console.log(this.$parent.tasks)
            // change the task in the parent component by task_id
            this.taskToUpdate = this.$parent.tasks.find(task => task.id === this.task_id)
            this.pile = this.$parent.tasks.find(task => task.id === this.task_id)
        },
        updateTask() {
            // change the task in the parent component by task_id
            this.$parent.tasks.find(task => task.id === this.task_id).title = this.taskToUpdate.title;
            this.$parent.tasks.find(task => task.id === this.task_id).description = this.taskToUpdate.description;
            this.$parent.tasks.find(task => task.id === this.task_id).hour = this.taskToUpdate.hour;
            this.$parent.tasks.find(task => task.id === this.task_id).label = this.taskToUpdate.label;
            this.$parent.tasks.find(task => task.id === this.task_id).priority = this.taskToUpdate.priority;
            this.$parent.tasks.find(task => task.id === this.task_id).comments = this.taskToUpdate.comments;
        }
    },
    mounted() {
        this.init();
    }
}
</script>

<style scoped>

</style>
