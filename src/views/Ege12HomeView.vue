<template>
  <div>
    <VNavbar
      title="ЕГЭ. Задание 12. Правописание личных окончаний глаголов и суффиксов причастий"
      has-home-button
    />

    <section class="section">
      <div class="columns">
        <div class="column">
          <div class="container">
            <div class="has-text-centered">
              <b-tooltip
                label="Comedy Genius Award Winner"
                position="is-bottom"
                delay="1500"
                type="is-light"
              >
                <button class="button" @click="openTaskGuide">
                    Прочитать теорию
                </button>
              </b-tooltip>
            </div>
            <hr>
            <p class="title is-5">
              Как пользоваться
            </p>
            <div class="content has-text-justified">
              <p>
                Выберите один из предложенных списков слов для закрепления. Эти
                слова могут попасться вам на экзамене в 12 задании. Ваша цель -
                вставить правильную букву.
              </p>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="container">
            <p class="title is-5">
              Списки слов для закрепления
            </p>
            <div class="list is-hoverable">
              <router-link
                :to="{ name: 'training', params: { 'topic': 'ege11-12-verbs-infinitives-hard' } }"
                class="list-item"
              >
                Инфинитивы (высокая сложность)
              </router-link>
              <router-link
                :to="{ name: 'training', params: { 'topic': 'ege11-12-verbs-infinitives-medium' } }"
                class="list-item"
              >
                Инфинитивы (средняя сложность)
              </router-link>
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
  name: 'Ege12HomeView',
  components: { VNavbar },
  methods: {
    openTaskGuide() {
      const url = 'http://letmegooglethat.com/?q=12+%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5+%D0%B5%D0%B3%D1%8D+%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9';
      window.open(url, '_blank');
    },
  },
};
</script>

<style scoped>
</style>
