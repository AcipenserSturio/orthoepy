<template>
  <div>
    <v-navbar
      title="ЕГЭ. Задание 12"
      has-home-button
    />

    <section class="section">
      <div class="columns">
        <div class="column">
          <div class="container">
            <div class="has-text-centered">
              <b-button @click="openTaskGuide">
                Прочитать теорию
              </b-button>
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
              <router-link :to="{ name: 'training-card', params: { 'topic': 'ege-t12-infinitives' } }" class="list-item">
                Инфинитивы
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BButton from 'buefy/src/components/button/Button.vue';
import VNavbar from '../components/VNavbar';

export default {
  name: 'EgeT12View',
  components: { VNavbar, BButton },
  methods: {
    openTaskGuide() {
      const url = 'http://letmegooglethat.com/?q=12+%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5+%D0%B5%D0%B3%D1%8D+%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9';
      window.open(url, '_blank')
    },
  },
};
</script>

<style scoped>
</style>
