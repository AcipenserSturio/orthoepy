<template>
  <div>
    <TaskPromptCheckbox
      v-if="isCheckboxPrompt"
      key="prompt-checkbox"
      :disabled="disabled"
      :type="type"
      :value="value || prompt.constructor.default"
      @input="updateValue"
      :prompt="prompt"
    />
    <TaskPromptText
      v-else-if="isTextPrompt"
      key="prompt-text"
      :disabled="disabled"
      :type="type"
      :value="value || prompt.constructor.default"
      @input="updateValue"
      :prompt="prompt"
    />
    <TaskPromptRadio
      v-else-if="isRadioPrompt"
      key="prompt-radio"
      :disabled="disabled"
      :type="type"
      :value="value || prompt.constructor.default"
      @input="updateValue"
      :prompt="prompt"
    />
    <p
      v-else
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
import {
  BasePrompt,
  CheckboxPrompt,
  TextPrompt,
  RadioPrompt,
} from '@/models/prompts';

export default {
  name: 'TaskPrompt',
  components: {
    TaskPromptCheckbox,
    TaskPromptRadio,
    TaskPromptText,
  },
  props: {
    value: [String, Array],
    prompt: BasePrompt,
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: 'is-primary',
    },
  },
  computed: {
    isCheckboxPrompt() {
      return this.prompt instanceof CheckboxPrompt;
    },
    isTextPrompt() {
      return this.prompt instanceof TextPrompt;
    },
    isRadioPrompt() {
      return this.prompt instanceof RadioPrompt;
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
