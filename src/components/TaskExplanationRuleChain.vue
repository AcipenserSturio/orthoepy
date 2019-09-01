<template>
  <div class="content">
    <p><i>Цепочка правил:</i></p>
    <ul>
      <li v-for="rule in explanation.ruleChain" :key="rule">
        {{ rule }} ⇨
      </li>
      <li><strong>{{ explanation.chainTail }}</strong></li>
    </ul>
  </div>
</template>

<script>
import { Explanation } from '@/models';

export default {
  name: 'TaskExplanationRuleChain',
  props: {
    explanation: Explanation,
  },
};
</script>

<style scoped>
</style>
