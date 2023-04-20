<template>
    <div class="dropdown">
        <button class="btn border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span v-show=" $parent.priority === 'P1'" class="text-danger"><font-awesome-icon :icon="['fas', 'flag']" /></span>
            <span v-show=" $parent.priority === 'P2'" class="text-warning"><font-awesome-icon :icon="['fas', 'flag']" /></span>
            <span v-show=" $parent.priority === 'P3'" class="text-primary"><font-awesome-icon :icon="['fas', 'flag']" /></span>
            <span v-show=" $parent.priority === 'Priorité'" class="text-secondary"><font-awesome-icon :icon="['fas', 'flag']" /></span>
            {{ $parent.priority }}
        </button>
        <ul class="dropdown-menu">
            <li v-for="(priority, index) in $parent.priorities" :key="index">
                <a class="dropdown-item text-secondary" @click="changePriority(priority)">
                    {{ priority.label }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "TheDropDownField",
    props: {
        label: {
            type: String,
            default: 'Étiquette'
        },
        datas: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        changePriority(priority) {
            this.$parent.priority = priority.value
        }
    }
}
</script>

<style scoped>

</style>
