<template>
  <div class="block">
    <div class="field" v-for="checkbox in checkboxes" :key="checkbox">
      <b-checkbox
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

export default {
  name: 'VPromptCheckbox',
  components: {
    BCheckbox,
  },
  props: {
    value: Array,
    checkboxes: Array,
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
