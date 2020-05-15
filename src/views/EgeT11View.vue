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
            <b-collapse
              class="card"
              animation="slide"
              v-for="(theory, index) of theoryItems"
              :key="getTheoryKey(index)"
              :open="isOpen === index"
              @open="isOpen = index">
              <div
                slot="trigger"
                slot-scope="props"
                class="card-header"
                role="button">
                <p class="card-header-title">
                  {{ theory.title }}
                </p>
                <a class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'menu-down' : 'menu-up'">
                  </b-icon>
                </a>
              </div>
              <div class="card-content">
                <div
                  v-for="(subtheory, subindex) of theory.subitems"
                  :key="getSubtheoryKey(subindex)">
                  <hr v-if="subindex !== 0">
                  <p class="title is-6">
                    {{ subtheory.title }}
                  </p>
                  <div class="content" v-html="marked(subtheory.text)"></div>
                </div>
              </div>
            </b-collapse>
          </div>
        </section>
      </div>
      <div class="column">
        <section class="section">
          <div class="container">
            <p class="title is-5">
              Списки слов для закрепления
            </p>
            <div class="list is-hoverable">
              <router-link :to="{ name: 'training-card', params: { 'topic': 'ege-t11-suffices-ik-ek' } }" class="list-item">
                Существительные. Суффиксы ИК/ЕК
              </router-link>
              <router-link :to="{ name: 'training-card', params: { 'topic': 'ege-t11-suffices-ic-ec' } }" class="list-item">
                Существительные. Суффиксы ИЦ/ЕЦ
              </router-link>
              <router-link :to="{ name: 'training-card', params: { 'topic': 'ege-t11-suffices-ichk-echk' } }" class="list-item">
                Существительные. Суффиксы ИЧК/ЕЧК
              </router-link>
              <router-link :to="{ name: 'training-card', params: { 'topic': 'ege-t11-suffices-ink-enk' } }" class="list-item">
                Существительные. Суффиксы ИНК/ЕНК
              </router-link>
              <router-link :to="{ name: 'training-card', params: { 'topic': 'ege-t11-nouns-mya' } }" class="list-item">
                Существительные. Слова на -МЯ
              </router-link>
            </div>
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

export default {
  name: "EgeT11View",
  components: { VNavbar, BCollapse, BIcon, BButton },
  data() {
    return {
      isOpen: -1,
      theoryItems: [
        {
          title: 'Существительные',
          subitems: [
            {
              title: 'Суффикс -ЕК или -ИК (-НИК, -ЧИК)?',
              text: 'Если поставить слово в родительный падеж, то гласная из суффикса может "выпасть". Если гласная "выпадает", то -ЕК, иначе -ИК. Примеры: карандашик - нет карандашика; человечек - нет человечка.',
            },
            {
              title: 'Суффикс -ЕЦ или -ИЦ?',
              text: 'Зависит от рода имени существительного. Для мужского рода: -ЕЦ. Для женского рода: -ИЦ. Для среднего рода: -ЕЦ, если ударение падает на слог после суффикса (может пропадать в именительном падеже, например: блюдцо - блюдец), и -ИЦ, если ударение предшедствует суффиксу.',
            },
            {
              title: 'Суффикс -ИЧК или -ЕЧК?',
              text: '-ИЧК пишется в словах женского рода, образованных от слов с суффиксом -ИЦ. В остальных случаях пишется -ЕЧК (например, если образовно от слов на -МЯ, слов с суффиксом -ЕК или -К или от сокращенных мужских имен на -ИК, таких как Эрик, Алик).',
            },
            {
              title: 'Суффикс -ИНК или -ЕНК?',
              text: '-ИНК пишется в существительных образованных от слов женского рода на -ИН-А, например: соломинка. Исключение: горлинка. -ЕНК пишется в остальных случаях (например, в существительных женского рода, обозначающих лиц женского пола, например: француженка, монашенка).\n\n*Исключение: горлинка*',
            },
            {
              title: 'Правописание существительных, оканчивающихся на -МЯ.',
              text: 'В разносклоняемых именах существительных, оканчивающихся на -МЯ (например, время или имя) при склонении и образовании новых однокоренных слов пишется суффикс -ЕН(ЕНН)- (например, время - времени, бремя - обременить). Но если слово на -МЯ является первой частью сложного слова, то оно находится там в своей начальной форме (с гласной Я) (например, времяпрепровождение).',
            },
          ],
        },
      ]
    }
  },
  methods: {
    marked(text) {
      return marked(text);
    },
    getTheoryKey(index) {
      return `theory_${index}`;
    },
    getSubtheoryKey(index) {
      return `subtheory_${index}`;
    }
  }
}
</script>

<style scoped>

</style>