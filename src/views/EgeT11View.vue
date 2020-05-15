<template>
  <div>
    <v-navbar
      title="ЕГЭ. Задание 11"
      has-home-button
    />

    <div class="columns">
      <div class="column">
        <section class="section">
          <div class="container">
            <p class="title is-5">
              Теория
            </p>
            <v-list-theory :theories="theories"/>
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
import BCollapse from 'buefy/src/components/collapse/Collapse';
import BIcon from 'buefy/src/components/icon/Icon';
import BButton from 'buefy/src/components/button/Button';
import VNavbar from '../components/VNavbar';
import VListTraining from '../components/VListTraining';
import VListTheory from '../components/VListTheory';

export default {
  name: "EgeT11View",
  components: { VListTheory, VListTraining, VNavbar, BCollapse, BIcon, BButton },
  data() {
    return {
      theories: [
        {
          title: 'Существительные',
          text: '**Суффикс -ЕК или -ИК (-НИК, -ЧИК)?**\n\n> Если поставить слово в родительный падеж, то гласная из суффикса может\n> "выпасть". Если гласная "выпадает", то -ЕК, иначе -ИК. Примеры: карандашик -\n> нет карандашика; человечек - нет человечка. \n\n---\n\n**Суффикс -ЕЦ или -ИЦ?**\n\n> Зависит от рода имени существительного. Для мужского рода: -ЕЦ. Для женского\n> рода: -ИЦ. Для среднего рода: -ЕЦ, если ударение падает на слог после суффикса\n> (может пропадать в именительном падеже, например: блюдцо - блюдец), и -ИЦ,\n> если ударение предшедствует суффиксу.\n\n---\n\n**Суффикс -ИЧК или -ЕЧК?**\n\n> -ИЧК пишется в словах женского рода, образованных от слов с суффиксом -ИЦ. В\n> остальных случаях пишется -ЕЧК (например, если образовно от слов на -МЯ,\n> слов с суффиксом -ЕК или -К или от сокращенных мужских имен на -ИК, таких как\n> Эрик, Алик). В русском языке нет безударного суффикса -ЯЧК.\n\n---\n\n**Суффикс -ИНК или -ЕНК?**\n\n> -ИНК пишется в существительных образованных от слов женского рода на -ИН-А,\n> например: соломинка. Исключение: горлинка. -ЕНК пишется в остальных случаях\n> (например, в существительных женского рода, обозначающих лиц женского пола,\n> например: француженка, монашенка).\n>\n> **Исключение:** горлинка\n\n---\n\n**Правописание существительных, оканчивающихся на -МЯ.**\n\n> В разносклоняемых именах существительных, оканчивающихся на -МЯ (например,\n> время или имя) при склонении и образовании новых однокоренных слов пишется\n> суффикс -ЕН(ЕНН)- (например, время - времени, бремя - обременить). Но если\n> слово на -МЯ является первой частью сложного слова, то оно находится там в\n> своей начальной форме (с гласной Я) (например, времяпрепровождение).\n\n---\n\n**Постоянные суффиксы существительных.**\n\n> Постоянные суффиксы всегда пишутся одинаково. Некоторые постоянные суффиксы\n> существительных: оньк, еньк, тель, кт, от, изн, ин, ств, онк, ени.',
        }
      ],
      trainings: [
        {
          title: 'Существительные. Суффиксы ИК/ЕК',
          topic: 'ege-t11-suffices-ik-ek',
          type: 'card',
        },
        {
          title: 'Существительные. Суффиксы ИЦ/ЕЦ',
          topic: 'ege-t11-suffices-ic-ec',
          type: 'card',
        },
        {
          title: 'Существительные. Суффиксы ИЧК/ЕЧК',
          topic: 'ege-t11-suffices-ichk-echk',
          type: 'card',
        },
        {
          title: 'Существительные. Суффиксы ИНК/ЕНК',
          topic: 'ege-t11-suffices-ink-enk',
          type: 'card',
        },
        {
          title: 'Существительные. Слова на -МЯ',
          topic: 'ege-t11-nouns-mya',
          type: 'card',
        },
      ],
    };
  },
}
</script>

<style scoped>
</style>
