<template>
  <div class="list is-hoverable">
    <router-link
      v-for="(training, i) of trainings"
      :key="`training-${i}`"
      class="list-item"
      :to="{ name: `training`, params: { 'topic': training.topic } }"
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
