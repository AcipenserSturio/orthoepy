<template>
  <div>
    <p class="has-text-centered title">
      {{ tasksCorrect }}/{{ tasksTotal }}
    </p>
    <p class="has-text-centered subtitle is-6">
      {{ verdict }}
    </p>
    <template v-if="showMistakesSummary">
      <hr>
      <div class="has-text-centered">
        <b-button
          type="is-text"
          tag="a"
          :disabled="tasksCorrect === tasksTotal"
          :href="mistakesHref"
          :download="`mistakes_${trainingTitle.replace(/\s+/g, '_')}.txt`"
        >
          Скачать файл с вашими ошибками
        </b-button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TrainingChooseResult',
  props: {
    tasksCorrect: Number,
    tasksTotal: Number,
    showMistakesSummary: {
      type: Boolean,
      required: false,
      default: false,
    },
    trainingTitle: {
      type: String,
      required: false,
      default: 'No training title',
    },
    userAnswers: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  computed: {
    verdict() {
      if (this.tasksTotal === 0) {
        return 'Отлично';
      }

      const correctness = this.tasksCorrect / this.tasksTotal;

      if (correctness === 1.00) {
        return 'Отлично';
      }
      if (correctness >= 0.75) {
        return 'Хорошо';
      }
      if (correctness >= 0.50) {
        return 'Посредственно';
      }
      return 'Плохо';
    },
    mistakesHref() {
      let mistakesContent = '';

      this.userAnswers.forEach((answer) => {
        if (answer.isCorrect) {
          return;
        }

        mistakesContent += `Ваш ответ: ${answer.userAnswer}\nПравильный ответ: ${answer.correctAnswer}\n\n`;
      });

      mistakesContent = mistakesContent.trimEnd();

      return `data:text/plain;charset=utf-8,${encodeURIComponent(mistakesContent)}`;
    },
  },
};
</script>

<style scoped>
</style>
