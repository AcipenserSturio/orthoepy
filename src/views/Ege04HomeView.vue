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
            <div class="content" v-html="theory_html"></div>
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
import marked from 'marked';
import VNavbar from '@/components/VNavbar.vue';
import VListTraining from '@/components/VListTraining.vue';

export default {
  name: 'Ege04HomeView',
  components: { VListTraining, VNavbar },
  data() {
    return {
      how_to_html: marked('Ответить на задание можно, нажав кнопку одного из предложенных вариантов или клавиши "Стрелка влево", "Стрелка вправо".\n\nЕсли у вас возникают проблемы с группами слов, я рекомендую почитать теорию. Там описаны закономерности при постановке некоторых ударений.'),
      theory_html: marked('- [Орфоэпический словник от ФИПИ 2020](http://doc.fipi.ru/ege/demoversii-specifikacii-kodifikatory/2020/ru_ege_2020.zip)\n- [Статья про ударения в глаголах](https://lampa.io/p/ударение-в-глаголах-00000000a0d8069e277eb510d1ca31bd)'),
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
