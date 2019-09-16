<template>
  <div class="content">
    <p><i>Цепочка правил:</i></p>
    <ul>
      <li v-for="(rule, index) in rulesExceptLast" :key="index">
        <s>{{ rule }}</s>
      </li>
      <li>{{ lastRule }}</li>
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
  computed: {
    rulesExceptLast() {
      return this.explanation.ruleChain.slice(0, -1);
    },
    lastRule() {
      return this.explanation.ruleChain[this.explanation.ruleChain.length - 1];
    },
  },
};
</script>

<style scoped>
</style>
