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
    activeTaskIndex: {
      type: Number,
      required: true,
    },
    activeState: {
      type: undefined,
      required: true,
    },
  },
  computed: {
    isAnsweringState() {
      return this.activeState === Training.STATE_ANSWERING;
    },
    isCheckingState() {
      return this.activeState === Training.STATE_CHECKING;
    },
    isFinishedState() {
      return this.activeState === Training.STATE_FINISHED;
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
