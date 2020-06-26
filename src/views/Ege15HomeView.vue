<template>
  <div>
    <VNavbar
      title="ЕГЭ. Задание 15. Пра­во­пи­са­ние -Н- и -НН- в суффиксах"
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
  name: 'Ege15HomeView',
  components: { VListTraining, VNavbar },
  data() {
    return {
      theory_html: marked('*Ищите в открытых источниках.*'),
      trainings: [
        {
          title: 'Исключения -Н-/-НН-',
          topic: 'ege15-n-nn-exceptions',
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
