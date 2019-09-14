<template>
  <div class="block">
    <div class="field" v-for="checkbox in prompt.checkboxes" :key="checkbox">
      <b-checkbox
        :disabled="disabled"
        :type="type"
        :native-value="checkbox"
        v-model="newValue"
      >
        {{ checkbox }}
      </b-checkbox>
    </div>
  </div>
</template>

<script>
import BCheckbox from 'buefy/src/components/checkbox/Checkbox.vue';

import { CheckboxPrompt } from '@/models/prompts';


export default {
  name: 'TaskPromptCheckbox',
  components: {
    BCheckbox,
  },
  props: {
    value: Array,
    prompt: CheckboxPrompt,
    disabled: Boolean,
    type: String,
  },
  data() {
    return {
      newValue: this.value,
    };
  },
  watch: {
    // When v-model change, set internal value.
    value(value) {
      this.newValue = value;
    },
    // Emit input event to update the user v-model.
    newValue(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style scoped>
</style>
