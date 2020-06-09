<template>
  <div class="card-footer">
    <template v-if="isAnsweringState && isPromptPositionedInCardFooter">
      <TrainingCardFooterTaskPrompt
        :prompt="activeTask.prompt"
        :value="value"
        @input="updateValue"
      />
    </template>

    <template v-else-if="isAnsweringState && !isPromptPositionedInCardFooter">
      <a class="card-footer-item" @click="onAnswer">
        Ответить
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
import TrainingCardFooterTaskPrompt from '@/components/TrainingCardFooterTaskPrompt.vue';
import Training from '@/models/training';

export default {
  name: 'TrainingCardFooter',
  components: { TrainingCardFooterTaskPrompt },
  props: {
    value: {
      type: undefined,
      required: true,
    },
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
    isLastTask() {
      return this.training.tasks.length === this.activeTaskIndex + 1;
    },
    isPromptPositionedInCardFooter() {
      const {
        positionInCard,
        POSITION_IN_CARD_FOOTER,
      } = this.activeTask.prompt.constructor;

      return positionInCard === POSITION_IN_CARD_FOOTER;
    },
  },
  methods: {
    updateValue(newValue) {
      this.$emit('input', newValue);
    },
    onAnswer() {
      this.$emit('answer');
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
