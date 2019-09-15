<template>
  <details>
    <summary
      class="accordion-control has-text-weight-semibold"
      style="margin-bottom: 1rem"
    >
      Пояснение
    </summary>
    <TaskExplanation :explanation="explanation"/>
  </details>
</template>

<script>
import TaskExplanation from '@/components/TaskExplanation.vue';

import { BaseExplanation } from '@/models/explanations';


export default {
  name: 'TrainingTestTaskExplanation',
  components: {
    TaskExplanation,
  },
  props: {
    explanation: BaseExplanation,
  },
};
</script>

<style scoped>
.accordion-control {
  cursor: pointer;
  outline: none;
}
</style>
