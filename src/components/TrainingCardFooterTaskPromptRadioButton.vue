<template>
  <div style="display: contents">
    <a
      v-for="radioButton in prompt.radioButtons"
      :key="radioButton"
      class="card-footer-item has-text-primary"
      @click="onRadioButtonClick(radioButton)"
    >
      {{ radioButton }}
    </a>
  </div>
</template>

<script>
import { RadioButtonPrompt } from '@/models/prompts';

export default {
  name: 'TrainingCardFooterTaskPromptRadioButton',
  props: {
    value: {
      type: RadioButtonPrompt.valueType,
      required: true,
    },
    prompt: {
      type: RadioButtonPrompt,
      required: true,
    },
  },
  mounted() {
    window.addEventListener('keyup', this.onKeyup);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onKeyup);
  },
  computed: {
    radioButtonsCount() {
      return this.prompt.radioButtons.length;
    },
  },
  methods: {
    updateValue(newValue) {
      this.$emit('input', newValue);
    },
    onRadioButtonClick(radioButton) {
      this.updateValue(radioButton);
      this.$emit('answer');
    },
    onKeyup(event) {
      switch (event.keyCode) {
      case 13:
        this.onKeyupEnter();
        break;
      case 37:
        this.onKeyupLeft();
        break;
      case 39:
        this.onKeyupRight();
        break;
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        this.onKeyupDigit(event.keyCode - 48);
        break;
      default:
        break;
      }
    },
    onKeyupEnter() {
      if (this.radioButtonsCount === 1) {
        this.onRadioButtonClick(this.prompt.radioButtons[0]);
      }
    },
    onKeyupLeft() {
      if (this.radioButtonsCount === 2) {
        this.onRadioButtonClick(this.prompt.radioButtons[0]);
      }
    },
    onKeyupRight() {
      if (this.radioButtonsCount === 2) {
        this.onRadioButtonClick(this.prompt.radioButtons[1]);
      }
    },
    onKeyupDigit(digit) {
      console.log('What');
      if (this.radioButtonsCount >= 1 && this.radioButtonsCount <= 9) {
        this.onRadioButtonClick(this.prompt.radioButtons[digit - 1]);
      }
    },
  },
};
</script>

<style scoped>
</style>
