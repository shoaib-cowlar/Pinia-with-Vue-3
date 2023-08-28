<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="" />
      <h1>Pinia Tasks</h1>

    <div class="new-task-form">
      <TaskForm />
    </div>
    </header>

    <!-- new task form -->



    <!-- filter buttons -->
    <nav class="container btn-container">
        <button @click="filter = 'favs'">Show Only Favs</button>
        <button @click="filter = 'all'">Show All </button>
      </nav>

      <!-- Loading -->

      <div class="loading" v-if="taskStore.loading">Loading tasks ...</div>
    <!-- task list -->
    <div class="container task-list">
      <div v-if="filter === 'all'">
        <p>You have {{ taskStore.totalCount }} tasks</p>
        <div v-for="task in taskStore.tasks" :key="task.name">
          <TaskLists :task="task" />
        </div>
      </div>

      <div v-if="filter === 'favs'">
        <p>You have {{ taskStore.favCount }} Fav Tasks</p>
        <div v-for="task in taskStore.favTasks" :key="task.name">
          <TaskLists :task="task" />
        </div>
      </div>
    </div>

  </main>
</template>

<script setup>
import { useTaskStore } from "./stores/TaskStore";
import TaskLists from "./components/TaskLists.vue";
import TaskForm from "./components/TaskForm.vue";
import { ref } from "vue";
const taskStore = useTaskStore();
// fetch the tasks
taskStore.getTasks();

const filter = ref("all");
</script>

<style scoped></style>
