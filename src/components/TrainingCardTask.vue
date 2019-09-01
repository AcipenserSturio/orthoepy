<template>
  <div
    class="card"
    :class="{ [isCorrect ? 'card-correct' : 'card-incorrect']: isChecking }"
  >
    <header class="card-header">
      <p class="card-header-title">
        {{ taskNumber }}/{{ tasksTotal }} — {{ test.topic }}
      </p>
    </header>

    <div class="card-content">
      <p style="margin-bottom: 1.5rem">{{ task.question }}</p>
      <TaskPrompt
        :disabled="isChecking"
        v-model="userAnswer"
        :prompt="task.prompt"
      />

      <div v-if="isChecking">
        <hr>
        <TrainingCardTaskCheckingLabel
          :is-correct="isCorrect"
          :display-answer="task.getDisplayAnswer()"
        />
        <TrainingCardTaskExplanation
          v-if="task.explanation"
          style="margin-top: 1.5rem"
          :explanation="task.explanation"
        />
      </div>
    </div>

    <footer class="card-footer">
      <a v-if="isChecking" class="card-footer-item">Продолжить</a>
      <a v-else class="card-footer-item">Ответить</a>
    </footer>
  </div>
</template>

<script>
import TaskPrompt from '@/components/TaskPrompt.vue';
import { Test } from '@/models';
import TrainingCardTaskCheckingLabel from '@/components/TrainingCardTaskCheckingLabel.vue';
import TrainingCardTaskExplanation from '@/components/TrainingCardTaskExplanation.vue';

export default {
  name: 'TrainingCardTask',
  components: {
    TrainingCardTaskExplanation,
    TrainingCardTaskCheckingLabel,
    TaskPrompt,
  },
  props: {
    test: Test,
    taskIndex: Number,
    savedUserAnswer: [String, Array],
    isChecking: Boolean,
  },
  data() {
    return {
      userAnswer: this.savedUserAnswer
        ? this.savedUserAnswer
        : this.test.tasks[this.taskIndex].prompt.default,
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
    isCorrect() {
      return this.task.checkAnswer(this.userAnswer);
    },
  },
};
</script>

<style scoped lang="scss">
.card-correct {
  box-shadow: 0 0 15px 1px rgba(hsl(141, 71%, 48%), 1);
}
.card-incorrect {
  box-shadow: 0 0 15px 1px rgba(hsl(348, 100%, 61%), 1);
}
</style>
