<template>
  <div v-if="test" key="training">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Тест
          </h1>
          <h2 class="subtitle">
            {{ test.topic }}
          </h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div
          v-for="(task, index) in test.tasks"
          :key="index"
        >
          <hr v-if="index !== 0">
          <TrainingTestTask
            :task="task"
            :number="index + 1"
            :preserved-number-length="maxTestNumberLength"
            v-model="testUserAnswers[index]"
          />
        </div>
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
import BIcon from 'buefy/src/components/icon/Icon.vue';

import { loadTest } from '@/loader';
import TrainingTestTask from '@/components/TrainingTestTask';


export default {
  name: 'TrainingTestView',
  components: {
    BIcon,
    TrainingTestTask,
  },
  data() {
    return {
      test: null,
      testUserAnswers: [],

      maxTestNumberLength: null,
    };
  },
  methods: {
    setTest(test) {
      this.test = test;
      this.testUserAnswers.length = test.tasks.length;
      this.maxTestNumberLength = test.tasks.length.toString().length;
    },
  },

  beforeRouteEnter(to, from, next) {
    loadTest(to.params.topic, 'test').then((test) => {
      next(vm => test && vm.setTest(test));
    });
  },
};
</script>

<style scoped>
</style>
