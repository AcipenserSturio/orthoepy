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
            <div v-for="(trainings, i) of trainings_lists" :key="i" style="margin-top: 1.5rem">
              <p class="subtitle is-6">{{ trainings.title }}</p>
              <VListTraining :trainings="trainings.list"/>
            </div>
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
      theory_html: marked('- [Словарик паронимов от ФИПИ 2020](http://doc.fipi.ru/ege/demoversii-specifikacii-kodifikatory/2020/ru_ege_2020.zip)\n- [Статья про нормы употребления паронимов](https://5-ege.ru/leksicheskie-normy-paronimy/)\n- [Словарь паронимов со значениями и примерами](http://russkiy-na-5.ru/dictionary/paronyms)'),
      trainings_lists: [
        {
          title: 'По частям речи',
          list: [
            {
              title: 'Все части речи',
              topic: 'ege05-all',
            },
            {
              title: 'Все глаголы',
              topic: 'ege05-verbs',
            },
            {
              title: 'Все существительные',
              topic: 'ege05-nouns',
            },
            {
              title: 'Все прилагательные',
              topic: 'ege05-adjs',
            },
          ],
        },
        {
          title: 'Глаголы',
          list: [
            {
              title: 'Все глаголы',
              topic: 'ege05-verbs',
            },
          ],
        },
        {
          title: 'Существительные',
          list: [
            {
              title: 'Все существительные',
              topic: 'ege05-nouns',
            },
            {
              title: 'Существительные на -ОСТЬ',
              topic: 'ege05-nouns-ost',
            },
            {
              title: 'Существительные с приставками',
              topic: 'ege05-nouns-prefix',
            },
            {
              title: 'Другие существительные',
              topic: 'ege05-nouns-other',
            },
          ],
        },
        {
          title: 'Прилагательные',
          list: [
            {
              title: 'Все прилагательные',
              topic: 'ege05-adjs',
            },
            {
              title: 'Прилагательные с суффиксом -ИСТ-',
              topic: 'ege05-adjs-ist',
            },
            {
              title: 'Причастия и отглагольные прилагательные',
              topic: 'ege05-adjs-verbal',
            },
            {
              title: 'Прилагательные с суффиксами -ЕЛЬСК- и -ЕЛЬН-',
              topic: 'ege05-adjs-sk-eln',
            },
            {
              title: 'Прилагательные с суффиксами -ИЧЕСК- и -ИЧН',
              topic: 'ege05-adjs-sk-ichn',
            },
            {
              title: 'Другие прилагательные с суффиксами -СК- и -Н-',
              topic: 'ege05-adjs-sk-mixed',
            },
            {
              title: 'Другие прилагательные с суффиксом -ЕЛЬН-',
              topic: 'ege05-adjs-other-eln',
            },
            {
              title: 'Другие прилагательные с суффиксом -ЛИВ-',
              topic: 'ege05-adjs-other-liv',
            },
            {
              title: 'Другие прилагательные с суффиксом -СТВЕНН-',
              topic: 'ege05-adjs-other-stvenn',
            },
            {
              title: 'Прилагательные с несколькими паронимами',
              topic: 'ege05-adjs-other-groups',
            },
            {
              title: 'Другие прилагательные',
              topic: 'ege05-adjs-other-mixed',
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
