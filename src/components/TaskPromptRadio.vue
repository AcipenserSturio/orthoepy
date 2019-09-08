<template>
  <div>
    <div class="field" v-for="radio in radios" :key="radio">
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

export default {
  name: 'TaskPromptRadio',
  components: {
    BRadio,
  },
  props: {
    value: String,
    radios: Array,
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
