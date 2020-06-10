<template>
  <div class="content">
    <p><em>Цепочка правил:</em></p>
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
  name: 'TrainingCardContentTaskFeedbackExplanationContentRuleChain',
  props: {
    explanation: {
      type: RuleChainExplanation,
      required: true,
    },
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
