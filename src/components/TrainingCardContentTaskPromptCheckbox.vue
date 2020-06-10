<template>
  <div class="block">
    <div v-for="checkbox in prompt.checkboxes" :key="checkbox" class="field">
      <b-checkbox
        :native-value="checkbox"
        :type="type"
        :disabled="disabled"
        :value="value"
        @input="updateValue"
      >
        {{ checkbox }}
      </b-checkbox>
    </div>
  </div>
</template>

<script>
import { CheckboxPrompt } from '@/models/prompts';

export default {
  name: 'TrainingCardContentTaskPromptCheckbox',
  props: {
    value: {
      type: CheckboxPrompt.valueType,
      required: true,
    },
    prompt: {
      type: CheckboxPrompt,
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
