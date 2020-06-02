<template>
  <div>
    <v-navbar
      title="ЕГЭ. Задание 4. Постановка ударения"
      has-home-button
    />

    <div class="columns">
      <div class="column">
        <section class="section">
          <div class="container">
            <p class="title is-5">
              Работа с тренажером
            </p>
            <div class="content" v-html="how_to_html"></div>
          </div>
        </section>
        <section class="section">
          <div class="container">
            <p class="title is-5">
              Теория
            </p>
            <p>
              ...
            </p>
          </div>
        </section>
      </div>
      <div class="column">
        <section class="section">
          <div class="container">
            <p class="title is-5">
              Списки слов для закрепления
            </p>
            <v-list-training :trainings="trainings"/>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import VNavbar from '@/components/VNavbar.vue';
import VListTraining from '@/components/VListTraining.vue';

export default {
  name: 'Ege04HomeView',
  components: { VListTraining, VNavbar },
  data() {
    return {
      how_to_html: '...',
      trainings: [
        {
          title: 'Существительные',
          topic: 'ege04-nouns',
          type: 'choose',
        },
        {
          title: 'Прилагательные',
          topic: 'ege04-adjs',
          type: 'choose',
        },
        {
          title: 'Наречия',
          topic: 'ege04-advs',
          type: 'choose',
        },
        {
          title: 'Глаголы',
          topic: 'ege04-verbs',
          type: 'choose',
        },
        {
          title: 'Причастия',
          topic: 'ege04-partics',
          type: 'choose',
        },
        {
          title: 'Деепричастия',
          topic: 'ege04-vpartics',
          type: 'choose',
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
