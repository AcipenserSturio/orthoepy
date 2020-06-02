<template>
  <div>
    <div class="content" v-html="marked(task.question)"></div>

    <div v-if="isChecking" style="margin-top: 2rem">
      <b-input
        disabled
        :type="isCorrect ? 'is-success' : 'is-danger'"
        :value="value"
      />
      <hr>
      <TrainingChooseTaskCheckingLabel
        :is-correct="isCorrect"
        :task-answer="task.answer"
      />
      <TrainingChooseTaskExplanation
        v-if="task.explanation"
        style="margin-top: 1.5rem"
        :explanation="task.explanation"
      />
    </div>
  </div>
</template>

<script>
import marked from 'marked';
import BInput from 'buefy/src/components/input/Input.vue';
import TrainingChooseTaskCheckingLabel from '@/components/TrainingChooseTaskCheckingLabel.vue';
import TrainingChooseTaskExplanation from '@/components/TrainingChooseTaskExplanation.vue';
import Task from '@/models/task';

export default {
  name: 'TrainingChooseTask',
  components: {
    TrainingChooseTaskExplanation,
    TrainingChooseTaskCheckingLabel,
    BInput,
  },
  props: {
    task: Task,
    isChecking: Boolean,
    isCorrect: Boolean,
    value: [String, Array],
  },
  methods: {
    marked: s => marked(s),
  },
};
</script>

<style scoped>
</style>
