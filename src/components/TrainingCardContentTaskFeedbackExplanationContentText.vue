<template>
  <div class="content" v-html="marked(this.explanation.text)"></div>
</template>

<script>
import { TextExplanation } from '@/models/explanations';
import marked from 'marked';

export default {
  name: 'TrainingCardContentTaskFeedbackExplanationContentText',
  props: {
    explanation: {
      type: TextExplanation,
      required: true,
    },
  },
  methods: {
    marked(text) {
      return marked(text);
    },
  },
};
</script>

<style scoped>
</style>
