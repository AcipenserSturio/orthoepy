<template>
  <TrainingCardContentTaskPromptText
    v-if="isTextPrompt"
    :prompt="prompt"
    :type="type"
    :disabled="disabled"
    :value="value"
    @input="updateValue"
  />

  <TrainingCardContentTaskPromptCheckbox
    v-else-if="isCheckboxPrompt"
    :prompt="prompt"
    :type="type"
    :disabled="disabled"
    :value="value"
    @input="updateValue"
  />

  <TrainingCardContentTaskPromptRadio
    v-else-if="isRadioPrompt"
    :prompt="prompt"
    :type="type"
    :disabled="disabled"
    :value="value"
    @input="updateValue"
  />

  <p v-else class="is-italic">
    Не удалось отобразить поле ввода ответа.
  </p>
</template>

<script>
import TrainingCardContentTaskPromptText from '@/components/TrainingCardContentTaskPromptText.vue';
import TrainingCardContentTaskPromptRadio from '@/components/TrainingCardContentTaskPromptRadio.vue';
import TrainingCardContentTaskPromptCheckbox from '@/components/TrainingCardContentTaskPromptCheckbox.vue';
import {
  TextPrompt,
  CheckboxPrompt,
  RadioPrompt,
} from '@/models/prompts_v2';

const supportedPrompts = [
  TextPrompt,
  CheckboxPrompt,
  RadioPrompt,
];

export default {
  name: 'TrainingCardContentTaskPrompt',
  components: {
    TrainingCardContentTaskPromptCheckbox,
    TrainingCardContentTaskPromptRadio,
    TrainingCardContentTaskPromptText,
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
  computed: {
    isTextPrompt() {
      return prompt instanceof TextPrompt;
    },
    isCheckboxPrompt() {
      return prompt instanceof CheckboxPrompt;
    },
    isRadioPrompt() {
      return prompt instanceof RadioPrompt;
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
