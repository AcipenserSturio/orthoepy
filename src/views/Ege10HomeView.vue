<template>
  <div>
    <VNavbar
      title="ЕГЭ. Задание 10. Правописание приставок"
      has-home-button
    />

    <div class="columns">
      <div class="column">
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
  name: 'Ege10HomeView',
  components: { VListTraining, VNavbar },
  data() {
    return {
      theory_html: marked('*Появится позже*'),
      trainings: [
        {
          title: 'Приставки ПРЕ- и ПРИ- (разные случаи с объяснениями)',
          topic: 'ege10-pre-pri-misc',
        },
        {
          title: 'Приставки ПРЕ- и ПРИ- (сложные случаи)',
          topic: 'ege10-pre-pri-difficult',
        },
        {
          title: 'Приставки РАЗ-/РАС- и РОЗ-/РОС-',
          topic: 'ege10-ro-ra-misc',
        },
        {
          title: 'Мягкий и твердый знак после приставок',
          topic: 'ege10-soft-hard-misc',
        },
        {
          title: 'Приставки ПРА- и ПРО-',
          topic: 'ege10-pra-pro-misc',
        },
        {
          title: 'Приставки на "с" и "з"',
          topic: 'ege10-z-s-misc',
        },
        {
          title: 'Гласная "и" и "ы" после приставок',
          topic: 'ege10-i-y-misc',
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
