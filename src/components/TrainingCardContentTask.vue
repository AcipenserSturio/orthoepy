<template>
  <div>
    <div class="content" v-html="marked(activeTask.question)"></div>

    <TrainingCardContentTaskPrompt
      v-if="isPromptPositionedInCardContent"
      :prompt="activeTask.prompt"
      :disabled="isCheckingState"
      type="is-primary"
      :value="value"
      @input="updateValue"
    />

    <div v-if="isCheckingState">
      <hr>
      <TrainingCardContentTaskFeedback
        :training="training"
        :active-task-index="activeTaskIndex"
      />
    </div>
  </div>
</template>

<script>
import TrainingCardContentTaskPrompt from '@/components/TrainingCardContentTaskPrompt.vue';
import TrainingCardContentTaskFeedback from '@/components/TrainingCardContentTaskFeedback.vue';
import Training from '@/models/training';
import marked from 'marked';

export default {
  name: 'TrainingCardContentTask',
  components: {
    TrainingCardContentTaskPrompt,
    TrainingCardContentTaskFeedback,
  },
  props: {
    value: {
      type: undefined,
      required: true,
    },
    training: {
      type: Training,
      required: true,
    },
    trainingState: {
      type: undefined,
      required: true,
    },
    activeTaskIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isAnsweringState() {
      return this.trainingState === Training.STATE_ANSWERING;
    },
    isCheckingState() {
      return this.trainingState === Training.STATE_CHECKING;
    },
    isFinishedState() {
      return this.trainingState === Training.STATE_FINISHED;
    },
    activeTask() {
      return this.training.tasks[this.activeTaskIndex];
    },
    isPromptPositionedInCardContent() {
      const {
        positionInCard,
        POSITION_IN_CARD_CONTENT,
      } = this.activeTask.prompt.constructor;

      return positionInCard === POSITION_IN_CARD_CONTENT;
    },
  },
  methods: {
    marked(text) {
      return marked(text);
    },
    updateValue(newValue) {
      this.$emit('input', newValue);
    },
  },
};
</script>

<style scoped>
</style>
