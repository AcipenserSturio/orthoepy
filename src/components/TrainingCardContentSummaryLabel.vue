<template>
  <div>
    <p class="title has-text-centered">
      {{ correctCount }} / {{ totalCount }}
    </p>
    <p class="subtitle is-6 has-text-centered">
      {{ verdict }}
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
    correctCount() {
      return this.training.userAnswersCorrectCount;
    },
    totalCount() {
      return this.training.userAnswersTotalCount;
    },
    verdict() {
      const correctness = this.correctCount / this.totalCount;

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
