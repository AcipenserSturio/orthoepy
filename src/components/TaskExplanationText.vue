<template>
  <p v-html="textHTML"></p>
</template>

<script>
import { TextExplanation } from '@/models/explanations';
import { linkify } from '@/utils';

export default {
  name: 'TaskExplanationText',
  props: {
    explanation: TextExplanation,
  },
  computed: {
    textHTML() {
      return linkify(this.explanation.text);
    },
  },
};
</script>

<style scoped>
</style>
