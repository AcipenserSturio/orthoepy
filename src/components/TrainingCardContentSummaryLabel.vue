<template>
  <div v-if="hasNonNullAnswers">
    <p class="title has-text-centered">
      {{ correctAnswersCount }} / {{ nonNullAnswersCount }}
    </p>
    <p class="subtitle is-6 has-text-centered">
      {{ verdict }}
    </p>
  </div>
  <div v-else>
    <p class="title has-text-centered">
      —
    </p>
    <p class="subtitle is-6 has-text-centered">
      Без ответов
    </p>
  </div>
</template>

<script>
import Training from '@/models/training';

export default {
  name: 'TrainingCardContentSummaryLabel',
  props: {
    training: {
      type: Training,
      required: true,
    },
  },
  computed: {
    hasNonNullAnswers() {
      return this.nonNullAnswersCount > 0;
    },
    correctAnswersCount() {
      return this.training.userAnswersCorrectCount;
    },
    nonNullAnswersCount() {
      return this.training.userAnswersTotalCount - this.training.userAnswersNullCount;
    },
    verdict() {
      const correctness = this.correctAnswersCount / this.nonNullAnswersCount;

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
  },
};
</script>

<style scoped>
</style>
