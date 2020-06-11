<template>
  <div style="display: contents">
    <a
      class="card-footer-item has-text-primary"
      @click="onSelfCheckClick"
    >
      Проверить себя
    </a>
  </div>
</template>

<script>
import { SelfCheckPrompt } from '@/models/prompts';

export default {
  name: 'TrainingCardFooterTaskPromptRadioButton',
  props: {
    value: {
      type: SelfCheckPrompt.valueType,
      required: true,
    },
    prompt: {
      type: SelfCheckPrompt,
      required: true,
    },
  },
  methods: {
    updateValue(newValue) {
      this.$emit('input', newValue);
    },
    onSelfCheckClick() {
      this.updateValue(null);
      this.$emit('answer');
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
      this.onSelfCheckClick();
    },
  },
};
</script>

<style scoped>
</style>
