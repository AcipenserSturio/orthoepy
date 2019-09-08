<template>
  <div>
    <p style="margin-bottom: 1.5rem">{{ task.question }}</p>
    <TaskPrompt
      :disabled="isChecking"
      :type="isChecking
        ? (isCorrect ? 'is-success' : 'is-danger')
        : ('is-info')"
      :prompt="task.prompt"
      :value="value"
      @input="updateValue"
    />

    <div v-if="isChecking">
      <hr>
      <TrainingCardTaskCheckingLabel
        :is-correct="isCorrect"
        :display-answer="task.getDisplayAnswer()"
      />
      <TrainingCardTaskExplanation
        v-if="task.explanation"
        style="margin-top: 1.5rem"
        :explanation="task.explanation"
      />
    </div>
  </div>
</template>

<script>
import TaskPrompt from '@/components/TaskPrompt.vue';
import { Task } from '@/models';
import TrainingCardTaskCheckingLabel from '@/components/TrainingCardTaskCheckingLabel.vue';
import TrainingCardTaskExplanation from '@/components/TrainingCardTaskExplanation.vue';

export default {
  name: 'TrainingCardTask',
  components: {
    TaskPrompt,
    TrainingCardTaskCheckingLabel,
    TrainingCardTaskExplanation,
  },
  props: {
    task: Task,
    isChecking: Boolean,
    isCorrect: Boolean,
    value: [String, Array],
  },
  methods: {
    updateValue(newValue) {
      this.$emit('input', newValue);
    },
  },
};
</script>

<style scoped>
</style>
