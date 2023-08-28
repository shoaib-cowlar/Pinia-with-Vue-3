import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
  }),
  getters: {
    favTasks() {
      return this.tasks.filter((t) => t.isFav);
    },
    favCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },
    totalCount(state) {
      return state.tasks.length;
    },
  },
  actions: {
    async getTasks() {
      this.loading = true;
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      this.tasks = data;
      this.loading = false;
    },
    async addTask(task) {
      // this.tasks.push(task);
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (res.ok) {
        this.getTasks(); // Fetch the updated tasks after adding
      } else {
        console.error("Failed to add task to server.");
      }
    },
    async deleteTask(taskId) {
      // this.tasks = this.tasks.filter((task) => task.id !== taskId);
      const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      this.getTasks(); // Fetch the updated tasks after deletion
    } else {
      console.error("Failed to delete task from server.");
    }

    },
    async favToggle(taskId) {
    const task = this.tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, isFav: !task.isFav };

    const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH", // Use PATCH or PUT based on your API
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (res.ok) {
      this.getTasks(); // Fetch the updated tasks after toggling
    } else {
      console.error("Failed to toggle task's isFav property on server.");
    }
  },

  },
});
