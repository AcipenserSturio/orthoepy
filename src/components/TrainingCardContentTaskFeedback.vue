<template>
  <div>
    <TrainingCardContentTaskFeedbackLabel
      :training="training"
      :active-task-index="activeTaskIndex"
    />

    <div v-if="activeTask.explanation">
      <div class="spacer"></div>

      <TrainingCardContentTaskFeedbackExplanation
        :explanation="activeTask.explanation"
      />
    </div>
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
.spacer {
  font-size: 0;
  height: 1rem;
  line-height: 0;
}
</style>
