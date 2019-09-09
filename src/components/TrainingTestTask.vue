<template>
  <div class="is-flex" style="align-items: flex-start">
    <div
      class="has-text-right"
      style="margin-right: 1rem"
      :style="{ width: preservedNumberLength + 'rem' }"
    >
      <strong>{{ number }}.</strong>
    </div>
    <div style="flex: auto">
      <p style="margin-bottom: 1.5rem">{{ task.question }}</p>
      <div class="columns">
        <TaskPrompt
          class="column is-half"
          :prompt="task.prompt"
          :value="value"
          @input="updateValue"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TaskPrompt from '@/components/TaskPrompt.vue';
import { Task } from '@/models';

export default {
  name: 'TrainingTestTask',
  components: {
    TaskPrompt,
  },
  props: {
    task: Task,
    number: Number,
    preservedNumberLength: Number,
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
