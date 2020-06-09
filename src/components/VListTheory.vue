<template>
  <div>
    <b-collapse
      class="card"
      v-for="(theory, i) of theories"
      :key="`theory-${i}`"
      animation="slide"
      :open="openTheoryIndex === i"
      @open="openTheoryIndex = i"
    >
      <div
        class="card-header"
        role="button"
        slot="trigger"
        slot-scope="props"
      >
        <p class="card-header-title is-uppercase">
          {{ theory.title }}
        </p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
        </a>
      </div>
      <div class="card-content content" v-html="marked(theory.text)">
      </div>
    </b-collapse>
  </div>
</template>

<script>
import marked from 'marked';

export default {
  name: 'VListTheory',
  props: {
    theories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      openTheoryIndex: -1,
    };
  },
  methods: {
    marked(text) {
      return marked(text);
    },
  },
};
</script>

<style scoped>
</style>
