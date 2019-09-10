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
        <div class="columns">

          <div class="column is-one-third">
            <div class="has-text-centered">
              <b-button @click="openRuleTraining">
                Тренировать правила
              </b-button>

              <p class="is-size-7" style="margin-top: 1rem">
                Здесь вы можете изучить правила слитного и раздельно
                правописания частицы "не" в формате <strong>карточек</strong>.
              </p>
            </div>
          </div>

          <div class="column is-one-third">
            <div class="has-text-centered">
              <b-button @click="openAlgorithmTraining">
                Тренировать алгоритм
              </b-button>

              <p class="is-size-7" style="margin-top: 1rem">
                Тренировка алгоритма, по которому можно определить, писать слово
                слитно или раздельно, в формате <strong>карточек</strong>.
              </p>
            </div>
          </div>

          <div class="column is-one-third">
            <div class="has-text-centered">
              <b-button @click="openTaskTraining">
                Тренировать задания
              </b-button>

              <p class="is-size-7" style="margin-top: 1rem">
                Вам предложат задания в формате <strong>теста</strong>, где
                необходимо будет указать правильное написание: слитное или
                раздельное.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BButton from 'buefy/src/components/button/Button.vue';

export default {
  name: 'NotHomeView',
  components: { BButton },
  methods: {
    openRuleTraining() {
      alert('Doesn\'t work right now (rule).');
    },
    openAlgorithmTraining() {
      alert('Doesn\'t work right now (algorithm).');
    },
    openTaskTraining() {
      alert('Doesn\'t work right now (task).');
    },
  },
};
</script>
