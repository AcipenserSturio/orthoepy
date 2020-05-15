<template>
  <b-field>
    <b-input
      ref="input"
      :disabled="disabled"
      :type="type"
      :placeholder="prompt.placeholder"
      :value="value"
      @input="updateValue"
      autofocus>
    </b-input>
  </b-field>
</template>

<script>
import BInput from 'buefy/src/components/input/Input.vue';
import BField from 'buefy/src/components/field/Field.vue';
import { TextPrompt } from '@/models/prompts';

export default {
  name: 'TaskPromptText',
  components: {
    BInput,
    BField,
  },
  props: {
    value: String,
    prompt: TextPrompt,
    disabled: Boolean,
    type: String,
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
