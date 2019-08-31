<template>
  <div class="block">
    <div class="field" v-for="checkbox in checkboxes" :key="checkbox">
      <b-checkbox
        v-model="givenAnswer"
        :native-value="checkbox"
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
    checkboxes: Array,
  },
  data() {
    return {
      givenAnswer: [],
    };
  },
};
</script>

<style scoped>
</style>
