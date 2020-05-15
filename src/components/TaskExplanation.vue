<template>
  <div class="content">
    <TaskExplanationRuleChain
      v-if="isRuleChainExplanation"
      key="explanation-rule-chain"
      :explanation="explanation"
    />
    <TaskExplanationText
      v-else-if="isTextExplanation"
      :explanation="explanation"
    />
    <p
      v-else
      class="is-italic"
    >
      Не удалось отобразить пояснение.
    </p>
  </div>
</template>

<script>
import TaskExplanationRuleChain from '@/components/TaskExplanationRuleChain.vue';
import TaskExplanationText from '@/components/TaskExplanationText.vue';

import {
  BaseExplanation,
  TextExplanation,
  RuleChainExplanation,
} from '@/models/explanations';

export default {
  name: 'TaskExplanation',
  components: {
    TaskExplanationText,
    TaskExplanationRuleChain,
  },
  props: {
    explanation: BaseExplanation,
  },
  computed: {
    isTextExplanation() {
      return this.explanation instanceof TextExplanation;
    },
    isRuleChainExplanation() {
      return this.explanation instanceof RuleChainExplanation;
    },
  },
};
</script>

<style scoped>
</style>
