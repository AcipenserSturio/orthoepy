<template>
  <div class="content" v-html="marked(this.explanation.text)"></div>
</template>

<script>
import marked from 'marked';
import { TextExplanation } from '@/models/explanations';

export default {
  name: 'TaskExplanationText',
  props: {
    explanation: TextExplanation,
  },
  methods: {
    marked(s) {
      return marked(s);
    },
  },
};
</script>

<style scoped>
</style>
