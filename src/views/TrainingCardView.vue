<template>
  <div class="has-items-centered">
    <div>
      <div
        v-if="test"
        class="card"
        :class="{ [isCorrect ? 'card-correct' : 'card-incorrect']: isChecking }"
      >
        <header class="card-header">
          <p v-if="isCompleted" class="card-header-title">
            Результаты — {{ test.title }}
          </p>
          <p v-else-if="shouldDisplayProgress" class="card-header-title">
            {{ taskNumber }}/{{ tasksTotal }} — {{ test.title }}
          </p>
          <p v-else class="card-header-title">
            {{ test.title }}
          </p>
          <a v-if="!isCompleted" class="card-header-icon has-text-dark" @click="onComplete">
            <b-icon icon="door-open" size="is-small" title="Завершить"/>
          </a>
        </header>

        <div class="card-content">
          <TrainingCardTask
            v-if="!isCompleted"
            :task="currentTask"
            :is-checking="isChecking"
            :is-correct="isCorrect"
            v-model="currentAnswer"
            @enterPressed="onEnterPress"
          />
          <TrainingCardResult
            v-else
            :tasks-correct="getTasksCorrect()"
            :tasks-total="tasksSolved"
          />
        </div>

        <footer class="card-footer">
          <template v-if="isAnsweringStage">
            <a class="card-footer-item" @click="onAnswer">
              Ответить
            </a>
          </template>

          <template v-else-if="isCheckingStage">
            <template v-if="isLastTask">
              <a class="card-footer-item" @click="onComplete">
                Завершить
              </a>
            </template>
            <template v-else>
              <a class="card-footer-item" @click="onContinue">
                Продолжить
              </a>
            </template>
          </template>

          <template v-else-if="isCompletedStage">
            <a v-if="shouldOfferRepeat" class="card-footer-item" @click="onRepeat">
              Повторить
            </a>
            <router-link class="card-footer-item" :to="{ name: 'home' }">
              На главную
            </router-link>
          </template>

          <template v-else>
            <p class="is-italic card-footer-item">
              Не удалось отобразить кнопки управления.
            </p>
          </template>
        </footer>
      </div>

      <div v-else>
        <p class="title has-text-white">
          Увы,
        </p>
        <p class="subtitle has-text-grey-lighter">
          но такого теста не существует
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import TrainingCardTask from '@/components/TrainingCardTask.vue';
import TrainingCardResult from '@/components/TrainingCardResult.vue';
import { getTraining } from '@/trainer';

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
    isAnsweringStage() {
      return !this.isCompleted && !this.isChecking;
    },
    isCheckingStage() {
      return this.isChecking;
    },
    isCompletedStage() {
      return this.isCompleted;
    },
    taskNumber() {
      return this.taskIndex + 1;
    },
    tasksTotal() {
      return this.test.tasks.length;
    },
    tasksSolved() {
      return this.taskIndex;
    },
    currentTask() {
      return this.test.tasks[this.taskIndex];
    },
    isLastTask() {
      return this.taskIndex === this.tasksTotal - 1;
    },
    shouldDisplayProgress() {
      return !this.test.options.hideProgress;
    },
    shouldOfferRepeat() {
      return this.test.options.offerRepeat;
    },
  },
  beforeCreate() {
    document.documentElement.className = 'training-card-view';
  },
  mounted() {
    window.addEventListener('keyup', this.onKeyup);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onKeyup);
  },
  destroyed() {
    document.documentElement.className = '';
  },
  beforeRouteEnter(to, from, next) {
    getTraining(to.params.topic, 'card').then((test) => {
      next(vm => test && vm.setTest(test));
    });
  },
  methods: {
    setTest(test) {
      this.test = test;
      this.testUserAnswers.length = test.tasks.length;
    },
    onKeyup(event) {
      if (event.keyCode === 13) {
        this.onEnterPress();
      }
    },
    onEnterPress() {
      if (this.isAnsweringStage) {
        this.onAnswer();
        return;
      }
      if (this.isCheckingStage && !this.isLastTask) {
        this.onContinue();
        return;
      }
      if (this.isCheckingStage && this.isLastTask) {
        this.onComplete();
      }
    },
    getTasksCorrect() {
      let count = 0;

      this.testUserAnswers.forEach((answer) => {
        if (answer.isCorrect) count += 1;
      });

      return count;
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
      if (this.isChecking) {
        this.taskIndex += 1;
      }

      this.currentAnswer = null;
      this.isChecking = false;
      this.isCorrect = null;
      this.isCompleted = true;
    },
    onRepeat() {
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
@import "./../assets/variables";

html.training-card-view {
  background-color: $primary;
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
