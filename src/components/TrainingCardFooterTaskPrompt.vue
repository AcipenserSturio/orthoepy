<template>
  <TrainingCardFooterTaskPromptRadioButton
    v-if="isRadioButtonPrompt"
    ref="radioButtonPrompt"
    :prompt="prompt"
    :value="value"
    @input="updateValue"
    @answer="onAnswer"
  />

  <TrainingCardFooterTaskPromptSelfCheck
    v-else-if="isSelfCheckPrompt"
    ref="selfCheckPrompt"
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
import TrainingCardFooterTaskPromptSelfCheck from '@/components/TrainingCardFooterTaskPromptSelfCheck.vue';
import {
  RadioButtonPrompt,
  SelfCheckPrompt,
} from '@/models/prompts';

const supportedPrompts = [
  RadioButtonPrompt,
  SelfCheckPrompt,
];

export default {
  name: 'TrainingCardFooterTaskPrompt',
  components: {
    TrainingCardFooterTaskPromptRadioButton,
    TrainingCardFooterTaskPromptSelfCheck,
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
    isSelfCheckPrompt() {
      return this.prompt instanceof SelfCheckPrompt;
    },
  },
  methods: {
    updateValue(newValue) {
      this.$emit('input', newValue);
    },
    onAnswer() {
      this.$emit('answer');
    },
    onKeyup(event) {
      if (this.isRadioButtonPrompt) {
        this.$refs.radioButtonPrompt.onKeyup(event);
      } else if (this.isSelfCheckPrompt) {
        this.$refs.selfCheckPrompt.onKeyup(event);
      }
    },
  },
};
</script>

<style scoped>
</style>
