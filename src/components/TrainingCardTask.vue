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
      <VPrompt
        :disabled="isChecking"
        v-model="userAnswer"
        :prompt="task.prompt"
      />

      <div v-if="isChecking">
        <hr>

        <div style="margin-bottom: 1.5rem">
          <div v-if="isCorrect" class="label-correct">
            <p>
              Правильно ✔
            </p>
          </div>

          <div v-else class="label-incorrect">
            <p>
              Неправильно ✘
            </p>
            <p class="is-size-7">
              <i>Ответ:</i> {{ task.answer }}
            </p>
          </div>
        </div>

        <details>
          <summary class="accordion-control has-text-weight-bold">
            Пояснение
          </summary>
          Здесь будет поянение.
        </details>
      </div>
    </div>

    <footer class="card-footer">
      <a v-if="isChecking" class="card-footer-item">Продолжить</a>
      <a v-else class="card-footer-item">Ответить</a>
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
