<template>
  <div>
    <p class="has-text-centered title">
      {{ tasksCorrect }}/{{ tasksTotal }}
    </p>
    <p class="has-text-centered subtitle is-6">
      {{ verdict }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'TrainingTestResult',
  props: {
    tasksCorrect: Number,
    tasksTotal: Number,
  },
  computed: {
    verdict() {
      const correctness = this.tasksCorrect / this.tasksTotal;

      if (correctness === 1.00) {
        return 'Отлично';
      }
      if (correctness >= 0.75) {
        return 'Хорошо';
      }
      if (correctness >= 0.50) {
        return 'Посредственно';
      }
      return 'Плохо';
    },
  },
};
</script>

<style scoped>
</style>
