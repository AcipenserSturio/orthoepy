<template>
  <div class="card-content">
    <TrainingCardContentTask
      v-if="isAnsweringState || isCheckingState"
      :training="training"
      :training-state="trainingState"
      :active-task-index="activeTaskIndex"
      :value="value"
      @input="updateValue"
    />
    <TrainingCardContentSummary
      v-else-if="isFinishedState"
      :training="training"
      :training-state="trainingState"
      :active-task-index="activeTaskIndex"
    />
    <p v-else class="is-italic">
      Не удалось отобразить содержимое.
    </p>
  </div>
</template>

<script>
import TrainingCardContentTask from '@/components/TrainingCardContentTask.vue';
import TrainingCardContentSummary from '@/components/TrainingCardContentSummary.vue';
import Training from '@/models/training';

export default {
  name: 'TrainingCardContent',
  components: {
    TrainingCardContentSummary,
    TrainingCardContentTask,
  },
  props: {
    value: {
      type: undefined,
      required: true,
    },
    training: {
      type: Training,
      required: true,
    },
    trainingState: {
      type: undefined,
      required: true,
    },
    activeTaskIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isAnsweringState() {
      return this.trainingState === Training.STATE_ANSWERING;
    },
    isCheckingState() {
      return this.trainingState === Training.STATE_CHECKING;
    },
    isFinishedState() {
      return this.trainingState === Training.STATE_FINISHED;
    },
  },
  methods: {
    updateValue(newValue) {
      this.$emit('input', newValue);
    },
  },
};
</script>

<style scoped>
</style>
