<template>
  <div>
    <TrainingCardContentSummaryLabel
      :training="training"
    />

    <div v-if="shouldShowMistakes">
      <hr>
      <TrainingCardContentSummaryMistakes
        :training="training"
      />
    </div>
  </div>
</template>

<script>
import TrainingCardContentSummaryLabel from '@/components/TrainingCardContentSummaryLabel.vue';
import TrainingCardContentSummaryMistakes from '@/components/TrainingCardContentSummaryMistakes.vue';
import Training from '@/models/training';

export default {
  name: 'TrainingCardContentSummary',
  components: {
    TrainingCardContentSummaryLabel,
    TrainingCardContentSummaryMistakes,
  },
  props: {
    training: {
      type: Training,
      required: true,
    },
  },
  computed: {
    shouldShowMistakes() {
      return this.training.config.showMistakesSummary;
    },
  },
};
</script>

<style scoped>
</style>
