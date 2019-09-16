<template>
  <div>
    <div class="is-flex" style="align-items: flex-start">
      <div
        class="has-text-right"
        style="margin-right: 1rem"
        :style="{ width: preservedNumberLength + 'rem' }"
      >
        <strong>{{ number }}.</strong>
      </div>
      <div style="flex: auto; flex-direction: column">
        <div class="content" style="margin-bottom: 2rem" v-html="marked(task.question)"></div>
        <TaskPrompt
          class="column is-half"
          :disabled="isChecking"
          :type="isChecking
            ? (isCorrect ? 'is-success' : 'is-danger')
            : ('is-primary')"
          :prompt="task.prompt"
          :value="value"
          @input="updateValue"
        />
        <div v-if="isChecking" style="margin-top: 1.5rem">
          <TrainingTestTaskCheckingLabel
            :is-correct="isCorrect"
            :task-answer="task.answer"
          />
          <TrainingTestTaskExplanation
            v-if="task.explanation"
            style="margin-top: 1.5rem"
            :explanation="task.explanation"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked';

import TaskPrompt from '@/components/TaskPrompt.vue';
import TrainingTestTaskCheckingLabel from '@/components/TrainingTestTaskCheckingLabel';
import TrainingTestTaskExplanation from '@/components/TrainingTestTaskExplanation';

import Task from '@/models/task';


export default {
  name: 'TrainingTestTask',
  components: {
    TrainingTestTaskExplanation,
    TrainingTestTaskCheckingLabel,
    TaskPrompt,
  },
  props: {
    task: Task,
    number: Number,
    preservedNumberLength: Number,
    isChecking: Boolean,
    isCorrect: Boolean,
    value: [String, Array],
  },
  methods: {
    marked: s => marked(s),
    updateValue(newValue) {
      this.$emit('input', newValue);
    },
  },
};
</script>

<style scoped>
</style>
