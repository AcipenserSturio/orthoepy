<template>
  <div class="has-items-centered">
    <div
      v-if="test"
      key="training"
      class="card"
      :class="{ [isCorrect ? 'card-correct' : 'card-incorrect']: isChecking }"
    >
      <header class="card-header">
        <p v-if="!isCompleted" class="card-header-title">
          {{ taskNumber }}/{{ tasksTotal }} — {{ test.title }}
        </p>
        <p v-else class="card-header-title">
          Результаты — {{ test.title }}
        </p>
      </header>

      <div class="card-content">
        <TrainingCardTask
          v-if="!isCompleted"
          :task="currentTask"
          :is-checking="isChecking"
          :is-correct="isCorrect"
          v-model="currentAnswer"
        />
        <TrainingCardResult
          v-else
          :tasks-correct="tasksCorrect"
          :tasks-total="tasksTotal"
        />
      </div>

      <footer class="card-footer">
        <router-link v-if="isCompleted" class="card-footer-item" :to="{ name: 'home' }">
          На главную
        </router-link>
        <a v-else-if="!isChecking" class="card-footer-item" @click="onAnswer">
          Ответить
        </a>
        <a v-else-if="!isLastTask" class="card-footer-item" @click="onContinue">
          Продолжить
        </a>
        <a v-else class="card-footer-item" @click="onComplete">
          Завершить
        </a>
      </footer>
    </div>

    <div v-else key="error-message">
      <p class="title has-text-white">
        Увы,
      </p>
      <p class="subtitle has-text-grey-lighter">
        но такого теста не существует
      </p>
    </div>
  </div>
</template>

<script>
import TrainingCardTask from '@/components/TrainingCardTask.vue';
import TrainingCardResult from '@/components/TrainingCardResult.vue';

import { makeTest } from '@/test-maker';


export default {
  name: 'TrainingCardView',
  components: {
    TrainingCardResult,
    TrainingCardTask,
  },
  data() {
    return {
      test: null,
      testUserAnswers: [],

      taskIndex: 0,
      currentAnswer: null,

      isChecking: false,
      isCorrect: null,
      isCompleted: false,
    };
  },
  computed: {
    taskNumber() {
      return this.taskIndex + 1;
    },
    tasksTotal() {
      return this.test.tasks.length;
    },
    tasksCorrect() {
      let count = 0;

      this.testUserAnswers.forEach((answer) => {
        if (answer.isCorrect) count += 1;
      });

      return count;
    },
    currentTask() {
      return this.test.tasks[this.taskIndex];
    },
    isLastTask() {
      return this.taskIndex === this.tasksTotal - 1;
    },
  },
  beforeCreate() {
    document.documentElement.className = 'training-card-view';
  },
  destroyed() {
    document.documentElement.className = '';
  },
  beforeRouteEnter(to, from, next) {
    makeTest(to.params.topic, 'card').then((test) => {
      next(vm => vm.setTest(test));
    });
  },
  methods: {
    setTest(test) {
      this.test = test;
      this.testUserAnswers.length = test.tasks.length;
    },
    onAnswer() {
      this.isChecking = true;
      this.isCorrect = this.currentTask.checkAnswer(this.currentAnswer);
      this.testUserAnswers[this.taskIndex] = {
        userAnswer: this.currentAnswer,
        isCorrect: this.isCorrect,
      };
    },
    onContinue() {
      this.currentAnswer = null;
      this.isChecking = false;
      this.isCorrect = null;

      this.taskIndex += 1;
    },
    onComplete() {
      this.currentAnswer = null;
      this.isChecking = false;
      this.isCorrect = null;

      this.isCompleted = true;
    },
  },
};
</script>

<style lang="scss">
@import "./../assets/variables";

html.training-card-view {
  background-color: $info;
}
</style>

<style lang="scss" scoped>
.has-items-centered {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

.card {
  width: 24rem;
}
.card-correct {
  box-shadow: 0 0 15px 1px rgba(hsl(141, 71%, 48%), 1);
}
.card-incorrect {
  box-shadow: 0 0 15px 1px rgba(hsl(348, 100%, 61%), 1);
}
</style>
