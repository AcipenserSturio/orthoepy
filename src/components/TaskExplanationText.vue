<template>
  <p>
    {{ explanation.text }}
  </p>
</template>

<script>
import { Explanation } from '@/models';

export default {
  name: 'TaskExplanationText',
  props: {
    explanation: Explanation,
  },
};
</script>

<style scoped>
</style>
