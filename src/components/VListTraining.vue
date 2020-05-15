<template>
  <div class="list is-hoverable">
    <router-link
      class="list-item"
      v-for="(training, i) of trainings"
      :key="`training-${i}`"
      :to="{ name: `training-${training.type}`, params: { 'topic': training.topic } }"
    >
      {{ training.title }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'VListTraining',
  props: {
    trainings: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>
