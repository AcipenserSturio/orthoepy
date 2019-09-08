<template>
  <div>
    <TaskPromptCheckbox
      v-if="prompt.type === 'checkbox'"
      key="prompt-checkbox"
      :disabled="disabled"
      :value="value || prompt.default"
      @input="updateValue"
      :checkboxes="prompt.checkboxes"
    />
    <TaskPromptRadio
      v-else-if="prompt.type === 'radio'"
      key="prompt-radio"
      :disabled="disabled"
      :value="value || prompt.default"
      @input="updateValue"
      :radios="prompt.radios"
    />
    <TaskPromptText
      v-else-if="prompt.type === 'text'"
      key="prompt-text"
      :disabled="disabled"
      :value="value || prompt.default"
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
import TaskPromptCheckbox from '@/components/TaskPromptCheckbox.vue';
import TaskPromptRadio from '@/components/TaskPromptRadio.vue';
import TaskPromptText from '@/components/TaskPromptText.vue';
import { Prompt } from '@/models';

export default {
  name: 'TaskPrompt',
  components: {
    TaskPromptCheckbox,
    TaskPromptRadio,
    TaskPromptText,
  },
  props: {
    value: [String, Array],
    prompt: Prompt,
    disabled: Boolean,
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
