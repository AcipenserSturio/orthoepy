<template>
  <div>
    <VNavbar
      title="Слитное и раздельное правописание НЕ"
      has-home-button
    />

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

              <p class="is-size-7 content" style="margin-top: 1rem">
                Тренировка алгоритма, по которому можно определить, писать слово
                слитно или раздельно, в формате <strong>карточек</strong>.
              </p>
            </div>
            <div class="content" style="margin-top: 2rem">
              <p class="has-text-centered">
                <a href="not-rules-algorithm.pdf" download>
                  Cкачать алгоритм в PDF.
                </a>
              </p>
              <div class="has-text-justified">
                <p>
                  Мы разработали алгоритм, по которому можно определить, как
                  нужно писать "не" в той или иной ситуации.
                </p>
                <p>
                  Вы последовательно задаете себе вопросы. Если вы отвечаете на
                  вопрос "нет", то вы спускаетесь по алгоритму дальше. Если же
                  вы ответили "да", то вы берете написание, определенное
                  конкретным вопросом.
                </p>
                <p>
                  Пока вы спускаетесь по алгоритму, вы проверяете особые
                  условия. В этих условиях правописание "не" c частью речи
                  отличается от того, как мы пишем обычно. Если вы спустились в
                  самый низ, отвечая при этом на все вопросы "нет", то вы
                  проверили все особые случаи и смело можете писать слово так,
                  как бы вы его написали в самых банальных условиях.
                </p>
              </div>
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
import VNavbar from '../components/VNavbar.vue';

export default {
  name: 'NotHomeView',
  components: { VNavbar },
  methods: {
    openRuleTraining() {
      this.$router.push({ name: 'training', params: { topic: 'not-rules' } });
    },
    openAlgorithmTraining() {
      this.$router.push({ name: 'training', params: { topic: 'not-algorithm' } });
    },
    openTaskTraining() {
      this.$router.push({ name: 'training', params: { topic: 'not-tasks' } });
    },
  },
};
</script>

<style scoped>
</style>
