<template>
  <div class="card-footer">
    <template v-if="isAnsweringState && !isButtonPrompt">
      <a class="card-footer-item">
        Ответить
      </a>
    </template>

    <template v-else-if="isAnsweringState && isButtonPrompt">
      <a v-for="option in activeTask.prompt.options" :key="option" class="card-footer-item">
        {{ option }}
      </a>
    </template>

    <template v-else-if="isCheckingState && !isLastTask">
      <a class="card-footer-item">
        Продолжить
      </a>
    </template>

    <template v-else-if="isCheckingState && isLastTask">
      <a class="card-footer-item">
        Закончить
      </a>
    </template>

    <template v-else-if="isFinishedState">
      <a v-if="shouldOfferRepeat" class="card-footer-item">
        Повторить
      </a>
      <a class="card-footer-item">
        На главную
      </a>
    </template>

    <template v-else>
      <p class="card-footer-item is-italic">
        Не удалось отобразить кнопки управления
      </p>
    </template>
  </div>
</template>

<script>
import Training from '@/models/training';

export default {
  name: 'TrainingCardFooter',
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
    shouldOfferRepeat() {
      return this.training.config.offerRepeat;
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
    activeTask() {
      return this.training.tasks[this.activeTaskIndex];
    },
    isButtonPrompt() {
      return this.activeTask.prompt.constructor.type === 'button';
    },
    isLastTask() {
      return this.training.tasks.length === this.activeTaskIndex + 1;
    },
  },
};
</script>

<style scoped>
</style>
