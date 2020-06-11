<template>
  <b-field :type="type">
    <div class="control">
      <input
        ref="input"
        autofocus
        class="input"
        :class="type"
        type="text"
        :disabled="disabled"
        :placeholder="prompt.placeholder"
        :value="value"
        @input="onInput"
      >
    </div>
  </b-field>
</template>

<script>
import { TextPrompt } from '@/models/prompts';

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
      default: '',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    disabled(newDisabled) {
      if (newDisabled === false) {
        this.$nextTick(() => this.$refs.input.focus());
      }
    },
  },
  methods: {
    updateValue(newValue) {
      this.$emit('input', newValue);
    },
    onInput(event) {
      // Source: Buefy's BInput
      //
      // Input's 'input' event listener, 'nextTick' is used to prevent event
      // firing before ui update, helps when using masks (Cleavejs and
      // potentially others).
      this.$nextTick(() => {
        if (event.target) {
          this.updateValue(event.target.value);
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
