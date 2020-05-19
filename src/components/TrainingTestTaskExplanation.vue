<template>
  <b-collapse :open="false" aria-id="contentIdForA11y1" animation="">
    <p
      slot="trigger"
      class="has-text-weight-semibold"
      slot-scope="props"
      aria-controls="contentIdForA11y1"
    >
      <b-icon size="is-small" :icon="!props.open ? 'caret-right' : 'caret-down'"></b-icon>
      {{ !props.open ? 'Пояснение' : 'Пояснение' }}
    </p>
    <TaskExplanation style="margin-top: 0.5rem" :explanation="explanation"/>
  </b-collapse>
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
