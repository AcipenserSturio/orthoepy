<template>
  <b-collapse :open="false" aria-id="explanation" animation="">
    <p
      slot="trigger"
      slot-scope="props"
      class="has-text-weight-semibold"
      aria-controls="explanation"
    >
      <b-icon size="is-small" :icon="!props.open ? 'caret-right' : 'caret-down'"></b-icon>
      {{ !props.open ? 'Пояснение' : 'Пояснение' }}
    </p>


    <TrainingCardContentTaskFeedbackExplanationContentText
      v-if="isTextExplanation"
      :explanation="explanation"
    />

    <TrainingCardContentTaskFeedbackExplanationContentRuleChain
      v-else-if="isRuleChainExplanation"
      :explanation="explanation"
    />

    <p v-else class="is-italic">
      Не удалось отобразить объяснение задания.
  </p>
  </b-collapse>
</template>

<script>
import TrainingCardContentTaskFeedbackExplanationContentText from '@/components/TrainingCardContentTaskFeedbackExplanationContentText.vue';
import TrainingCardContentTaskFeedbackExplanationContentRuleChain from '@/components/TrainingCardContentTaskFeedbackExplanationContentRuleChain.vue';
import {
  TextExplanation,
  RuleChainExplanation,
} from '@/models/explanations';

const supportedExplanations = [
  TextExplanation,
  RuleChainExplanation,
];

export default {
  name: 'TrainingCardContentTaskFeedbackExplanation',
  components: {
    TrainingCardContentTaskFeedbackExplanationContentText,
    TrainingCardContentTaskFeedbackExplanationContentRuleChain,
  },
  props: {
    explanation: {
      type: [...supportedExplanations],
      required: true,
    },
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
