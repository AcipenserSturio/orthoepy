<template>
  <div>
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
  methods: {
    updateValue(newValue) {
      this.$emit('input', newValue);
    },
    onRadioButtonClick(radioButton) {
      this.updateValue(radioButton);
      this.$emit('answer');
    },
  },
};
</script>

<style scoped>
</style>
