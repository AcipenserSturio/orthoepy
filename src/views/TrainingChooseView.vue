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
          <TrainingChooseTask
            v-if="!isCompleted"
            :task="currentTask"
            :is-checking="isChecking"
            :is-correct="isCorrect"
            :value="currentAnswer"
          />
          <TrainingChooseResult
            v-else
            :tasks-correct="getTasksCorrect()"
            :tasks-total="tasksSolved"
            :training-title="test.title"
            :show-mistakes-summary="shouldShowMistakesSummary"
            :user-answers="testUserAnswers"
          />
        </div>

        <footer class="card-footer">
          <template v-if="isAnsweringStage">
            <a
              v-for="radio in currentTask.prompt.radios"
              :key="radio"
              class="card-footer-item"
              @click="onAnswer(radio)"
            >
              {{ radio }}
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
import TrainingChooseTask from '@/components/TrainingChooseTask.vue';
import TrainingChooseResult from '@/components/TrainingChooseResult.vue';
import { getTraining } from '@/trainer';

export default {
  name: 'TrainingChooseView',
  components: {
    TrainingChooseResult,
    TrainingChooseTask,
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
    shouldShowMistakesSummary() {
      return this.test.options.showMistakesSummary;
    },
  },
  beforeCreate() {
    document.documentElement.className = 'training-choose-view';
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
    getTraining(to.params.topic, 'choose').then((test) => {
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
      } else if (event.keyCode === 37) {
        this.onLeftPress();
      } else if (event.keyCode === 39) {
        this.onRightPress();
      }
    },
    onEnterPress() {
      if (this.isCheckingStage && !this.isLastTask) {
        this.onContinue();
        return;
      }
      if (this.isCheckingStage && this.isLastTask) {
        this.onComplete();
      }
    },
    onLeftPress() {
      this.onAnswerPress(1);
    },
    onRightPress() {
      this.onAnswerPress(2);
    },
    onAnswerPress(number) {
      if (!this.isAnsweringStage) {
        return;
      }

      const radioIndex = number - 1;
      if (radioIndex >= this.currentTask.prompt.radios.length) {
        return;
      }

      const radio = this.currentTask.prompt.radios[number - 1];
      this.onAnswer(radio);
    },
    getTasksCorrect() {
      let count = 0;

      this.testUserAnswers.forEach((answer) => {
        if (answer.isCorrect) count += 1;
      });

      return count;
    },
    onAnswer(answer) {
      this.currentAnswer = answer;
      this.isChecking = true;
      this.isCorrect = this.currentTask.checkAnswer(this.currentAnswer);
      this.testUserAnswers[this.taskIndex] = {
        userAnswer: this.currentAnswer,
        correctAnswer: this.currentTask.answer,
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

html.training-choose-view {
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
