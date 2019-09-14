<template>
  <div class="content">
    <p><i>Цепочка правил:</i></p>
    <ul>
      <li v-for="rule in explanation.ruleChain" :key="rule">
        {{ rule }} ⇨
      </li>
      <li><strong>{{ explanation.result }}</strong></li>
    </ul>
  </div>
</template>

<script>
import { RuleChainExplanation } from '@/models/explanations';

export default {
  name: 'TaskExplanationRuleChain',
  props: {
    explanation: RuleChainExplanation,
  },
};
</script>

<style scoped>
</style>
