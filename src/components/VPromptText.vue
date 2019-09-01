<template>
  <b-field>
    <b-input
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
  name: 'VPromptText',
  components: {
    BInput,
    BField,
  },
  props: {
    value: String,
    placeholder: String,
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
