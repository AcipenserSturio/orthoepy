<template>
  <div>
    <div class="field" v-for="radio in prompt.radios" :key="radio">
      <b-radio
        :disabled="disabled"
        :type="type"
        :native-value="radio"
        :value="value"
        @input="updateValue"
      >
        {{ radio }}
      </b-radio>
    </div>
  </div>
</template>

<script>
import BRadio from 'buefy/src/components/radio/Radio.vue';

import { RadioPrompt } from '@/models/prompts';


export default {
  name: 'TaskPromptRadio',
  components: {
    BRadio,
  },
  props: {
    value: String,
    prompt: RadioPrompt,
    disabled: Boolean,
    type: String,
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
