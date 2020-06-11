<template>
  <div class="card-footer">
    <template v-if="isAnsweringState && isPromptPositionedInCardFooter">
      <TrainingCardFooterTaskPrompt
        :prompt="activeTask.prompt"
        :value="value"
        @input="updateValue"
        @answer="onAnswer"
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
    shouldOfferRepeat() {
      return this.training.config.offerRepeat;
    },
    isAnsweringState() {
      return this.trainingState === Training.STATE_ANSWERING;
    },
    isCheckingState() {
      return this.trainingState === Training.STATE_CHECKING;
    },
    isFinishedState() {
      return this.trainingState === Training.STATE_FINISHED;
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
  mounted() {
    window.addEventListener('keyup', this.onKeyup);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onKeyup);
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
    onKeyup(event) {
      switch (event.keyCode) {
      case 13:
        this.onKeyupEnter();
        break;
      default:
        break;
      }
    },
    onKeyupEnter() {
      if (this.isAnsweringState && !this.isPromptPositionedInCardFooter) {
        this.onAnswer();
      } else if (this.isCheckingState) {
        this.onContinue();
      }
    },
  },
};
</script>

<style scoped>
</style>
