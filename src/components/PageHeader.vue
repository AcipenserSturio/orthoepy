<template>
  <section class="hero is-primary">
    <div class="hero-body">
        <div class="level">
          <div class="level-left">
            <div class="container">
              <h1 class="title">
                {{ title }}
              </h1>
              <h2 class="subtitle" v-if="subtitle !== null">
                {{ subtitle }}
              </h2>
            </div>
          </div>

          <div class="level-right" v-if="hasHomeButton">
            <div class="level-item">
              <b-button @click="$router.push({ name: 'home' })" type="is-light">
                На главную
              </b-button>
            </div>
          </div>
        </div>
      </div>

  </section>
</template>

<script>
import BButton from 'buefy/src/components/button/Button.vue';

export default {
  name: "PageHeader",
  components: { BButton },
  props: {
    title: String,
    subtitle: {
      type: String,
      required: false,
      default: null,
    },
    hasHomeButton: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style scoped>
</style>
