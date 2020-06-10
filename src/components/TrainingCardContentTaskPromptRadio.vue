<template>
  <div class="block">
    <div v-for="radio in prompt.radios" :key="radio" class="field">
      <b-radio
        :native-value="radio"
        :type="type"
        :disabled="disabled"
        :value="value"
        @input="updateValue"
      >
        {{ radio }}
      </b-radio>
    </div>
  </div>
</template>

<script>
import { RadioPrompt } from '@/models/prompts';

export default {
  name: 'TrainingCardContentTaskPromptRadio',
  props: {
    value: {
      type: RadioPrompt.valueType,
      required: true,
    },
    prompt: {
      type: RadioPrompt,
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
  methods: {
    updateValue(newValue) {
      this.$emit('input', newValue);
    },
  },
};
</script>

<style scoped>
</style>
