<template>
  <div class="has-items-centered">
    <div
      v-if="test"
      key="training"
      class="card"
      :class="{ [isCorrect ? 'card-correct' : 'card-incorrect']: isChecking }"
    >
      <header class="card-header">
        <p class="card-header-title">
          {{ taskNumber }}/{{ tasksTotal }} — {{ test.topic }}
        </p>
      </header>

      <div class="card-content">
        <TrainingCardTask
          :task="currentTask"
          :is-checking="isChecking"
          :is-correct="isCorrect"
          v-model="currentAnswer"
        />
      </div>

      <footer class="card-footer">
        <a v-if="!isChecking" class="card-footer-item" @click="onAnswer">
          Ответить
        </a>
        <a v-else class="card-footer-item" @click="onContinue">
          Продолжить
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
import { loadTest } from '@/loader';

export default {
  name: 'TrainingCardView',
  components: {
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
    };
  },
  computed: {
    taskNumber() {
      return this.taskIndex + 1;
    },
    tasksTotal() {
      return this.test.tasks.length;
    },
    currentTask() {
      return this.test.tasks[this.taskIndex];
    },
  },
  beforeCreate() {
    document.documentElement.className = 'training-card-view';
  },
  destroyed() {
    document.documentElement.className = '';
  },
  beforeRouteEnter(to, from, next) {
    loadTest(to.params.topic, 'card').then((test) => {
      next(vm => test && vm.setTest(test));
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
      this.testUserAnswers[this.taskIndex] = this.currentAnswer;
    },
    onContinue() {
      this.currentAnswer = null;
      this.isChecking = false;
      this.isCorrect = null;

      if (this.taskIndex < this.tasksTotal - 1) {
        this.taskIndex += 1;
        return;
      }

      this.onComplete();
    },
    onComplete() {
      alert('You are done.');
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
