<template>
    <div>
    <TaskExplanationRuleChain
      v-if="explanation.type === 'rule-chain'"
      key="explanation-rule-chain"
      :explanation="explanation"
    />
    <TaskExplanationText
      v-else-if="explanation.type === 'text'"
      key="explanation-text"
      :explanation="explanation"
    />
    <p
      v-else
      key="explanation-error"
      class="is-italic"
    >
      Не удалось отобразить пояснение.
    </p>
  </div>
</template>

<script>
import { Explanation } from '@/models';
import TaskExplanationRuleChain from '@/components/TaskExplanationRuleChain.vue';
import TaskExplanationText from '@/components/TaskExplanationText.vue';

export default {
  name: 'TaskExplanation',
  components: {
    TaskExplanationText,
    TaskExplanationRuleChain,
  },
  props: {
    explanation: Explanation,
  },
};
</script>

<style scoped>
</style>
