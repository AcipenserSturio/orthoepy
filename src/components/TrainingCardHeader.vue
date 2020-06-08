<template>
  <div class="card-header">
    <template v-if="(isAnsweringState || isCheckingState) && shouldShowProgress">
      <div class="card-header-title">
        {{ activeTaskNumber }}/{{ tasksCount }} — {{ training.title }}
      </div>
    </template>
    <template v-else-if="(isAnsweringState || isCheckingState) && !shouldShowProgress">
      <div class="card-header-title">
        {{ training.title }}
      </div>
    </template>
    <template v-else-if="isFinishedState">
      <div class="card-header-title">
        Результаты — {{ training.title }}
      </div>
    </template>
    <template v-else>
      <div class="card-header-title is-italic">
        Не удалось отобразить заголовок
      </div>
    </template>

    <a
      v-if="isAnsweringState || isCheckingState"
      class="card-header-icon has-text-dark"
      @click="onFinish"
    >
      <b-icon icon="door-open" size="is-small" title="Закончить"/>
    </a>
  </div>
</template>

<script>
import Training from '@/models/training';

export default {
  name: 'TrainingCardHeader',
  props: {
    training: {
      type: Object,
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
    shouldShowProgress() {
      return !this.training.config.hideProgress;
    },
    isAnsweringState() {
      return this.activeState === Training.STATE_ANSWERING;
    },
    isCheckingState() {
      return this.activeState === Training.STATE_CHECKING;
    },
    isFinishedState() {
      return this.activeState === Training.STATE_FINISHED;
    },
    activeTaskNumber() {
      return this.activeTaskIndex + 1;
    },
    tasksCount() {
      return this.training.tasks.length;
    },
  },
  methods: {
    onFinish() {
      this.$emit('finish');
    },
  },
};
</script>

<style scoped>
</style>
