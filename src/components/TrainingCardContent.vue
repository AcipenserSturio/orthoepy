<template>
  <div class="card-content">
    Dummy Text
  </div>
</template>

<script>
import Training from '@/models/training';

export default {
  name: 'TrainingCardContent',
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
