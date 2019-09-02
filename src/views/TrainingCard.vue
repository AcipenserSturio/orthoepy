<template>
  <div class="has-items-centered has-background-info">
    <TrainingCardTask
      v-if="test"
      key="task"
      :task-index="taskIndex"
      :test="test"
      :saved-user-answer="savedUserAnswer"
      :is-checking="isChecking"
      @answer="onAnswer"
      @continue="onContinue"
    />

    <div
      v-else
      key="error-message"
    >
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
  name: 'TrainingCard',
  components: {
    TrainingCardTask,
  },
  data() {
    return {
      taskIndex: 0,
      savedUserAnswers: [],
      isChecking: false,
      test: null,
    };
  },
  computed: {
    savedUserAnswer() {
      const answer = this.savedUserAnswers[this.taskIndex];
      if (answer) {
        return answer;
      }
      return null;
    },
  },
  beforeRouteEnter(to, from, next) {
    loadTest(to.params.topic, 'card').then((test) => {
      next(vm => test && vm.setTest(test));
    });
  },
  methods: {
    setTest(test) {
      this.test = test;
      this.savedUserAnswers.length = test.tasks.length;
    },
    onAnswer(userAnswer) {
      this.isChecking = true;
      this.savedUserAnswers[this.taskIndex] = userAnswer;
    },
    onContinue() {
      this.isChecking = false;
      if (this.taskIndex < this.test.tasks.length - 1) {
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

<style scoped>
.has-items-centered {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
</style>
