<template>
  <div>
    <VPromptCheckbox
      v-if="prompt.type === 'checkbox'"
      key="prompt-checkbox"
      :value="value"
      @input="updateValue"
      :checkboxes="prompt.checkboxes"
    />
    <VPromptRadio
      v-else-if="prompt.type === 'radio'"
      key="prompt-radio"
      :value="value"
      @input="updateValue"
      :radios="prompt.radios"
    />
    <VPromptText
      v-else-if="prompt.type === 'text'"
      key="prompt-text"
      :value="value"
      @input="updateValue"
      :placeholder="prompt.placeholder"
    />
    <p
      v-else
      key="prompt-error"
      class="is-italic"
    >
      Не удалось отобразить поле ввода ответа.
    </p>
  </div>
</template>

<script>
import VPromptCheckbox from '@/components/VPromptCheckbox.vue';
import VPromptRadio from '@/components/VPromptRadio.vue';
import VPromptText from '@/components/VPromptText.vue';
import { Prompt } from '@/models';

export default {
  name: 'VPrompt',
  components: {
    VPromptCheckbox,
    VPromptRadio,
    VPromptText,
  },
  props: {
    value: [String, Array],
    prompt: Prompt,
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
