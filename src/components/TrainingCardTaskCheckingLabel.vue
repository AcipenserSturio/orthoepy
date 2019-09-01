<template>
  <div>
    <div v-if="isCorrect" class="label-correct">
      <p>
        Правильно ✔
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
  name: 'TrainingCardTaskCheckingLabel',
  props: {
    isCorrect: Boolean,
    displayAnswer: String,
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
