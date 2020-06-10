<template>
  <div>
    <template v-if="isCorrectAnswer" class="label-correct-answer">
      <p>
        <!-- https://stackoverflow.com/q/32915485 -->
        Правильно ✔&#xfe0e;
      </p>
    </template>

    <template v-else-if="isIncorrectAnswer" class="label-incorrect-answer">
      <p>
        Неправильно ✘
      </p>
      <div class="is-size-7" v-html="marked('*Ответ:* ' + activeTask.correctAnswer)"></div>
    </template>

    <template v-else-if="isNullAnswer" class="label-null-answer">
      <p>
        Без ответа ⧗
      </p>
      <div class="is-size-7" v-html="marked('*Ответ:* ' + activeTask.correctAnswer)"></div>
    </template>

    <template v-else>
      <p class="is-italic">
        Не удалось отобразить результат проверки
      </p>
    </template>
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
    isCorrectAnswer() {
      return this.training.userAnswersIsCorrect[this.activeTaskIndex] === true;
    },
    isIncorrectAnswer() {
      return this.training.userAnswersIsCorrect[this.activeTaskIndex] === false;
    },
    isNullAnswer() {
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
.label-correct-answer {
  color: green;
}
.label-incorrect-answer {
  color: darkred;
}
.label-null-answer {
  color: slateblue;
}
</style>
