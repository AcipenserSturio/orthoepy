<template>
  <div v-if="isAnswerCorrect" class="label-answer-correct">
    <p>
      <!-- https://stackoverflow.com/q/32915485 -->
      Правильно ✔&#xfe0e;
    </p>
  </div>

  <div v-else-if="isAnswerIncorrect" class="label-answer-incorrect">
    <p>
      Неправильно ✘
    </p>
    <div class="is-size-7" v-html="marked('*Ответ:* ' + activeTask.correctAnswer)"></div>
  </div>

  <div v-else-if="isAnswerNull" class="label-answer-null">
    <p>
      Без ответа ⧗
    </p>
    <div class="is-size-7" v-html="marked('*Ответ:* ' + activeTask.correctAnswer)"></div>
  </div>

  <div v-else>
    <p class="is-italic">
      Не удалось отобразить результат проверки
    </p>
  </div>
</template>

<script>
import Training from '@/models/training';
import marked from 'marked';

export default {
  name: 'TrainingCardContentTaskFeedbackLabel',
  props: {
    training: {
      type: Training,
      required: true,
    },
    activeTaskIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    activeTask() {
      return this.training.tasks[this.activeTaskIndex];
    },
    isAnswerCorrect() {
      return this.training.userAnswersIsCorrect[this.activeTaskIndex] === true;
    },
    isAnswerIncorrect() {
      return this.training.userAnswersIsCorrect[this.activeTaskIndex] === false;
    },
    isAnswerNull() {
      return this.training.userAnswersIsCorrect[this.activeTaskIndex] === null;
    },
  },
  methods: {
    marked(text) {
      return marked(text);
    },
  },
};
</script>

<style scoped>
.label-answer-correct {
  color: green;
}
.label-answer-incorrect {
  color: darkred;
}
.label-answer-null {
  color: slateblue;
}
</style>
