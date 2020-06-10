<template>
  <TrainingCardFooterTaskPromptRadioButton
    v-if="isRadioButtonPrompt"
    :prompt="prompt"
    :value="value"
    @input="updateValue"
    @answer="onAnswer"
  />

  <p v-else class="card-footer-item is-italic">
    Не удалось отобразить поле ввода ответа.
  </p>
</template>

<script>
import TrainingCardFooterTaskPromptRadioButton from '@/components/TrainingCardFooterTaskPromptRadioButton.vue';
import {
  RadioButtonPrompt,
} from '@/models/prompts';

const supportedPrompts = [
  RadioButtonPrompt,
];

export default {
  name: 'TrainingCardFooterTaskPrompt',
  components: {
    TrainingCardFooterTaskPromptRadioButton,
  },
  props: {
    value: {
      types: [...supportedPrompts].map(prompt => prompt.valueType),
      required: true,
    },
    prompt: {
      types: [...supportedPrompts],
      required: true,
    },
  },
  computed: {
    isRadioButtonPrompt() {
      return this.prompt instanceof RadioButtonPrompt;
    },
  },
  methods: {
    updateValue(newValue) {
      this.$emit('input', newValue);
    },
    onAnswer() {
      this.$emit('answer');
    },
  },
};
</script>

<style scoped>
</style>
