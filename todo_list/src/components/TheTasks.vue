<template>
    <div>
        <div class="card border-start-0 border-end-0 border-top-0" v-for="(task, index) in tasks" :key="'task_'+{index}">
            <div class="card-body ">
                <div class="align-items-center d-flex justify-content-between">
                    <h5 class="card-title">{{ task.title }}</h5>
                    <div class="d-flex align-items-center">
                        <TheTaskModal :task="task" :task_id="task.id"/>
                        <button @click="remove(task.id)" class="btn btn-sm border text-danger"><font-awesome-icon icon="eraser"/></button>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import TheTaskModal from "@/components/TheTaskModal.vue";

export default {
    name: "TheTasks",
    components: {TheTaskModal},
    props: {
        tasks: {
            type: Array,
            required: true,
        }
    },
    methods: {
        remove(id) {
            // remove the task in the parent component by task_id
            this.$parent.tasks = this.$parent.tasks.filter(task => task.id !== id);
        }
    }
}
</script>

<style scoped>
h5 {
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    font-variant: normal;
    text-transform: none;
    text-decoration: none solid rgba(0, 0, 0, 0.88);
}
p {
    font-size: 12px !important;
    font-weight: 400;
    font-style: normal;
    font-variant: normal;
    text-transform: none;
    text-decoration: none solid rgba(0, 0, 0, 0.56);
}
</style>
