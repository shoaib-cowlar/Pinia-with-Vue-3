<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i class="material-icons" @click="taskStore.deleteTask(task.id)"
        >delete</i
      >
      <i
        :class="['material-icons', task.isFav && 'fav']"
        @click="taskStore.favToggle(task.id)"
        >favorite</i
      >
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "../stores/TaskStore";

const props = defineProps({
  task: Object, // Make sure to specify the correct type
});

const taskStore = useTaskStore();
</script>

<style>
.fav{
    color: red;
}

</style>
