<template>
  <b-field :type="type">
    <b-input
      ref="input"
      autofocus

      :disabled="disabled"
      :placeholder="prompt.placeholder"

      :value="value"
      @input="updateValue"
    ></b-input>
  </b-field>
</template>

<script>
import { TextPrompt } from '@/models/prompts_v2';

export default {
  name: 'TrainingCardContentTaskPromptText',
  props: {
    value: {
      type: TextPrompt.valueType,
      required: true,
    },
    prompt: {
      type: TextPrompt,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'is-primary',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    disabled(oldValue, newValue) {
      if (newValue === true) {
        this.$refs.input.focus();
      }
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
