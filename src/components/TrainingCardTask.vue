<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ taskNumber }}/{{ tasksTotal }} — {{ test.topic }}
      </p>
    </header>

    <div class="card-content">
      <div class="content">
        <p>{{ task.question }}</p>
        <br>
        <VPrompt v-model="userAnswer" :prompt="task.prompt"/>
      </div>
    </div>

    <footer class="card-footer">
      <a href="#" class="card-footer-item">Ответить</a>
    </footer>
  </div>
</template>

<script>
import VPrompt from '@/components/VPrompt.vue';
import { Test } from '@/models';

export default {
  name: 'TrainingCardTask',
  components: {
    VPrompt,
  },
  props: {
    taskIndex: Number,
    test: Test,
  },
  data() {
    return {
      userAnswer: this.test.tasks[this.taskIndex].prompt.default,
    };
  },
  computed: {
    task() {
      return this.test.tasks[this.taskIndex];
    },
    taskNumber() {
      return this.taskIndex + 1;
    },
    tasksTotal() {
      return this.test.tasks.length;
    },
  },
};
</script>

<style scoped>
</style>
