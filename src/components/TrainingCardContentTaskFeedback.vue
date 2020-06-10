<template>
  <div>
    <TrainingCardContentTaskFeedbackLabel
      :training="training"
      :active-task-index="activeTaskIndex"
    />
    <TrainingCardContentTaskFeedbackExplanation
      v-if="activeTask.explanation"
      class="margin-top: 0.5rem"
      :explanation="activeTask.explanation"
    />
  </div>
</template>

<script>
import TrainingCardContentTaskFeedbackLabel from '@/components/TrainingCardContentTaskFeedbackLabel.vue';
import TrainingCardContentTaskFeedbackExplanation from '@/components/TrainingCardContentTaskFeedbackExplanation.vue';
import Training from '@/models/training';

export default {
  name: 'TrainingCardContentTaskFeedback',
  components: {
    TrainingCardContentTaskFeedbackExplanation,
    TrainingCardContentTaskFeedbackLabel,
  },
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
  },
};
</script>

<style scoped>
</style>
