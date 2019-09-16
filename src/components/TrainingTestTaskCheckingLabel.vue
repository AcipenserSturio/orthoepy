<template>
  <div>
    <div v-if="isCorrect" class="label-correct">
      <p>
        Правильно ✔&#xfe0e
      </p>
    </div>

    <div v-else class="label-incorrect">
      <p>
        Неправильно ✘
      </p>
      <p class="is-size-7">
        <i>Ответ:</i> {{ displayAnswer }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrainingTestTaskCheckingLabel',
  props: {
    isCorrect: Boolean,
    taskAnswer: [String, Array],
  },
  computed: {
    displayAnswer() {
      if (typeof this.taskAnswer === 'object') {
        return this.taskAnswer.join(', ');
      }
      return this.taskAnswer;
    },
  },
};
</script>

<style scoped>
.label-correct {
  color: green;
}
.label-incorrect {
  color: darkred;
}
</style>
