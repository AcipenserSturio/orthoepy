<template>
  <p v-html="textHTML"></p>
</template>

<script>
import { Explanation } from '@/models';
import { linkify } from '@/utils';

export default {
  name: 'TaskExplanationText',
  props: {
    explanation: Explanation,
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
