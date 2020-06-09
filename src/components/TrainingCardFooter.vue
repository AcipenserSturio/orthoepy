<template>
  <div class="card-footer">
    <template v-if="isAnsweringState && !isButtonPrompt">
      <a class="card-footer-item" @click="onAnswer">
        Ответить
      </a>
    </template>

    <template v-else-if="isAnsweringState && isButtonPrompt">
      <a
        v-for="option in activeTask.prompt.options"
        :key="option"
        class="card-footer-item has-text-primary"
        @click="onAnswer(option)"
      >
        {{ option }}
      </a>
    </template>

    <template v-else-if="isCheckingState && !isLastTask">
      <a class="card-footer-item" @click="onContinue">
        Продолжить
      </a>
    </template>

    <template v-else-if="isCheckingState && isLastTask">
      <a class="card-footer-item" @click="onContinue">
        Закончить
      </a>
    </template>

    <template v-else-if="isFinishedState">
      <a v-if="shouldOfferRepeat" class="card-footer-item" @click="onRepeat">
        Повторить
      </a>
      <a class="card-footer-item" @click="onHome">
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
  methods: {
    onAnswer(userAnswer) {
      this.$emit('answer', userAnswer);
    },
    onContinue() {
      this.$emit('continue');
    },
    onRepeat() {
      this.$emit('repeat');
    },
    onHome() {
      this.$emit('home');
    },
  },
};
</script>

<style scoped>
</style>
