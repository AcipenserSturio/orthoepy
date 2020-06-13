<template>
  <div>
    <VNavbar
      title="ЕГЭ. Задание 5. Употребление паронимов"
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
              Списки паронимов для закрепления
            </p>
            <VListTraining :trainings="trainings"/>
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
  name: 'Ege05HomeView',
  components: { VListTraining, VNavbar },
  data() {
    return {
      how_to_html: marked('Каждое задание предлагает вам объяснить слова одного паронимического ряда. Проверить себя можно, прочитав пояснение.'),
      theory_html: marked('- [Словарик паронимов от ФИПИ 2020](http://doc.fipi.ru/ege/demoversii-specifikacii-kodifikatory/2020/ru_ege_2020.zip)\n- [Словарь паронимов со значениями](https://bingoschool.ru/blog/199/)'),
      trainings: [
        {
          title: 'Все паронимы',
          topic: 'ege05-all',
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
