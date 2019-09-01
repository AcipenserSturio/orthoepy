<template>
  <b-field>
    <b-input
      :disabled="disabled"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue">
    </b-input>
  </b-field>
</template>

<script>
import BInput from 'buefy/src/components/input/Input.vue';
import BField from 'buefy/src/components/field/Field.vue';

export default {
  name: 'TaskPromptText',
  components: {
    BInput,
    BField,
  },
  props: {
    value: String,
    placeholder: String,
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
