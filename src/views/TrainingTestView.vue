<template>
  <div v-if="test" key="training">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Тест
          </h1>
          <h2 class="subtitle">
            {{ test.title }}
          </h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div v-if="isChecking">
          <TrainingTestResult
            :tasks-total="tasksTotal"
            :tasks-correct="tasksCorrect"
          />
          <hr>
        </div>
        <div
          v-for="(task, index) in test.tasks"
          :key="index"
        >
          <hr v-if="index !== 0">
          <TrainingTestTask
            :task="task"
            :number="index + 1"
            :preserved-number-length="maxTestNumberLength"
            :is-checking="isChecking"
            :is-correct="testIsCorrects[index]"
            v-model="testUserAnswers[index]"
          />
        </div>
      </div>

      <div class="buttons is-centered" style="margin-top: 1.5rem">
        <b-button @click="$router.push({ name: 'home' })">
          На главную
        </b-button>
        <b-button :disabled="isChecking" type="is-primary" @click="onComplete">
          Завершить
        </b-button>
      </div>
    </section>
  </div>

  <div v-else key="error-message">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Увы,
          </h1>
          <h2 class="subtitle">
            но такого теста не существует
          </h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container has-text-centered">
        <p>
          <b-icon
            class="has-text-grey-lighter"
            icon="emoticon-sad"
            size="is-large">
          </b-icon>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import BButton from 'buefy/src/components/button/Button.vue';
import BIcon from 'buefy/src/components/icon/Icon.vue';

import TrainingTestTask from '@/components/TrainingTestTask';
import TrainingTestResult from '@/components/TrainingTestResult';

import { getTest } from '@/tester';


export default {
  name: 'TrainingTestView',
  components: {
    TrainingTestResult,
    BButton,
    BIcon,
    TrainingTestTask,
  },
  data() {
    return {
      test: null,
      testUserAnswers: [],

      maxTestNumberLength: null,

      isChecking: false,
      testIsCorrects: [],
    };
  },
  computed: {
    tasksTotal() {
      return this.test.tasks.length;
    },
    tasksCorrect() {
      let count = 0;

      this.testIsCorrects.forEach((isCorrect) => {
        if (isCorrect) count += 1;
      });

      return count;
    },
  },
  methods: {
    setTest(test) {
      this.test = test;
      this.testUserAnswers.length = test.tasks.length;
      this.maxTestNumberLength = test.tasks.length.toString().length;
    },
    onComplete() {
      this.isChecking = true;
      for (let i = 0; i < this.test.tasks.length; i += 1) {
        const task = this.test.tasks[i];
        const userAnswer = this.testUserAnswers[i];
        this.testIsCorrects[i] = task.checkAnswer(userAnswer);
      }
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
  },

  beforeRouteEnter(to, from, next) {
    getTest(to.params.topic, 'test').then((test) => {
      next(vm => test && vm.setTest(test));
    });
  },
};
</script>

<style scoped>
</style>
