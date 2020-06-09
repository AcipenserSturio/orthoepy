<template>
  <b-navbar type="is-primary" :mobile-burger="hasHomeButton">
    <template slot="brand">
      <b-navbar-item tag="div">
        <p class="has-text-weight-bold">
          {{ title }}
        </p>
      </b-navbar-item>
    </template>
    <template slot="end" v-if="hasHomeButton">
      <b-navbar-item tag="div">
        <b-button
          class="is-primary is-light"
          @click="$router.push({ name: 'home' })"
        >
          На главную
        </b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'VNavbar',
  props: {
    title: {
      type: String,
      required: true,
    },
    hasHomeButton: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
</style>
