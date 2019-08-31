<template>
  <b-field>
    <b-input
      v-model="givenAnswer"
      :placeholder="placeholder">
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
    placeholder: String,
  },
  data() {
    return {
      givenAnswer: '',
    };
  },
};
</script>

<style scoped>
</style>
