<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Слитное и раздельное правописание НЕ
          </h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="has-text-centered">
          <b-button @click="openTraining">
            Открыть тренажер
          </b-button>
        </div>
        <hr>
        <div class="content">
          <p class="title is-5">
            Как пользоваться
          </p>
          <p>
            Здесь когда-нибудь появится справка.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BButton from 'buefy/src/components/button/Button.vue';

export default {
  name: 'NotHome',
  components: { BButton },
  methods: {
    openTraining() {
      this.$router.push({
        name: 'question-training',
        params: { topic: 'not' },
      });
    },
  },
};
</script>
