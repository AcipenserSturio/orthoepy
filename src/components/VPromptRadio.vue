<template>
  <div>
    <div class="field" v-for="radio in radios" :key="radio">
      <b-radio
        v-model="givenAnswer"
        :native-value="radio"
      >
        {{ radio }}
      </b-radio>
    </div>
  </div>
</template>

<script>
import BRadio from 'buefy/src/components/radio/Radio.vue';

export default {
  name: 'VPromptRadio',
  components: {
    BRadio,
  },
  props: {
    radios: Array,
  },
  data() {
    return {
      givenAnswer: String,
    };
  },
};
</script>

<style scoped>
</style>
