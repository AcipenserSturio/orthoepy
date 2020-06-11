<template>
  <div class="has-text-centered">
    <b-button
      type="is-text"
      tag="a"
      :disabled="!hasMistakes"
      :href="mistakesHref"
      :download="mistakesFile"
      label="Файл с вашими ошибками"
    >
    </b-button>
  </div>
</template>

<script>
import Training from '@/models/training';

export default {
  name: 'TrainingCardContentSummaryMistakes',
  props: {
    training: {
      type: Training,
      required: true,
    },
  },
  computed: {
    hasMistakes() {
      return this.training.userAnswersCorrectCount !== this.training.userAnswersTotalCount;
    },
    mistakesHref() {
      const mistakeTexts = [];

      for (let taskIndex = 0; taskIndex < this.training.tasks.length; taskIndex += 1) {
        if (this.training.userAnswersIsCorrect[taskIndex] !== false) {
          /* eslint-disable-next-line no-continue */
          continue;
        }

        const mistakeText = [
          '[Вопрос]',
          '',
          `${this.training.tasks[taskIndex].question}`,
          '',
          '[Ваш ответ]',
          '',
          `${this.training.userAnswers[taskIndex]}`,
          '',
          '[Правильный ответ]',
          '',
          `${this.training.tasks[taskIndex].correctAnswer}`,
        ].join('\n');

        mistakeTexts.push(mistakeText);
      }

      const mistakesContent = `${mistakeTexts.join('\n\n\n\n').trim()}\n`;
      return `data:text/plain;charset=utf-8,${encodeURIComponent(mistakesContent)}`;
    },
    mistakesFile() {
      return `Ошибки [${this.training.title}].txt`;
    },
  },
};
</script>

<style scoped>
</style>
