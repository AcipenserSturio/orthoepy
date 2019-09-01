<template>
  <div
    class="card"
    :class="[isCorrect ? 'card-correct' : 'card-incorrect']"
  >
    <header class="card-header">
      <p class="card-header-title">
        {{ taskNumber }}/{{ tasksTotal }} — {{ test.topic }}
      </p>
    </header>

    <div class="card-content">
      <div class="content">
        <p>
          {{ task.question }}
        </p>
        <br>
        <VPrompt
          disabled
          v-model="userAnswer"
          :prompt="task.prompt"
        />

        <hr>

        <p v-if="isCorrect" class="label-correct">
          Правильно ✔
        </p>
        <p v-else class="label-incorrect">
          Неправильно ✘
        </p>

        <details>
          <summary class="accordion-control has-text-weight-bold">
            Объяснение
          </summary>
          <p>
            Здесь будет объяснение.
          </p>
        </details>
      </div>
    </div>

    <footer class="card-footer">
      <a class="card-footer-item">Продолжить</a>
    </footer>
  </div>
</template>

<script>
import VPrompt from '@/components/VPrompt.vue';
import { Test } from '@/models';

export default {
  name: 'TrainingCardTaskChecking',
  components: {
    VPrompt,
  },
  props: {
    test: Test,
    taskIndex: Number,
    savedUserAnswer: [String, Array],
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
      return this.userAnswer === this.task.answer;
    },
  },
};
</script>

<style scoped lang="scss">
  .accordion-control {
    cursor: pointer;
    outline: none;
  }

  .card-correct {
    box-shadow: 0 0 15px 1px rgba(hsl(141, 71%, 48%), 1);
  }
  .card-incorrect {
    box-shadow: 0 0 15px 1px rgba(hsl(348, 100%, 61%), 1);
  }

  .label-correct {
    color: green;
  }
  .label-incorrect {
    color: darkred;
  }
</style>
