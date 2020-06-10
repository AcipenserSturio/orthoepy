<template>
  <TrainingCardContentSummaryLabel
    :training="training"
  />
</template>

<script>
import Training from '@/models/training';
import TrainingCardContentSummaryLabel from '@/components/TrainingCardContentSummaryLabel.vue';

export default {
  name: 'TrainingCardContentSummary',
  components: { TrainingCardContentSummaryLabel },
  props: {
    training: {
      type: Training,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>
