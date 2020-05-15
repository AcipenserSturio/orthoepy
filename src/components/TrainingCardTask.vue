<template>
  <div>
    <div class="content" style="margin-bottom: 2rem" v-html="marked(task.question)"></div>
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
        :task-answer="task.answer"
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
import marked from 'marked';
import TaskPrompt from '@/components/TaskPrompt.vue';
import TrainingCardTaskCheckingLabel from '@/components/TrainingCardTaskCheckingLabel.vue';
import TrainingCardTaskExplanation from '@/components/TrainingCardTaskExplanation.vue';
import Task from '@/models/task';

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
    marked: s => marked(s),
    updateValue(newValue) {
      this.$emit('input', newValue);
    },
  },
};
</script>

<style scoped>
</style>
