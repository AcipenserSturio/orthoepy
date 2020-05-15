<template>
  <div>
    <v-navbar
      title="Орфоэпия"
      has-home-button
    />

    <section class="section">
      <div class="columns">
        <div class="column">
          <div class="container">
            <div class="has-text-centered">
              <b-button @click="$router.push({ name: 'orthoepy-article' })">
                Прочитать теорию
              </b-button>
            </div>
            <hr>
            <p class="title is-5">
              Как пользоваться
            </p>
            <div class="content has-text-justified">
              <p>
                Данный тренажёр предлагает в случайном порядке проблемные слова
                из одного из нижеприведённых списков, ваша цель - правильно
                назвать у слов ударение.
              </p>
              <p>
                После того, как вы один раз ответили на каждое слово в списке,
                тренажёр будет предлагать слова вновь, в этот раз приоритизируя
                те, в которых у вас были ошибки.
              </p>
              <p>
                Если вы хотите проверить произношение некоторого слова, не
                дожидаясь вопроса, вы можете навести курсор на это слово в
                столбце слева, и правильное произношение будет вам показано.
              </p>
              <p>
                Тренажёр заканчивает предлагать вопросы, если последний ваш
                ответ на каждое слово был правильным.
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
              <router-link :to="{ name: 'training', query: { q: 0 } }" class="list-item">
                Версия-прототип: всего 4 слова
              </router-link>
              <router-link :to="{ name: 'training', query: { q: 1 } }" class="list-item">
                Имена существительные
              </router-link>
              <router-link :to="{ name: 'training', query: { q: 2 } }" class="list-item">
                Имена прилагательные
              </router-link>
              <router-link :to="{ name: 'training', query: { q: 3 } }" class="list-item">
                Глаголы
              </router-link>
              <router-link :to="{ name: 'training', query: { q: 4 } }" class="list-item">
                Причастия
              </router-link>
              <router-link :to="{ name: 'training', query: { q: 5 } }" class="list-item">
                Деепричастия
              </router-link>
              <router-link :to="{ name: 'training', query: { q: 6 } }" class="list-item">
                Наречия
              </router-link>
              <router-link :to="{ name: 'training', query: { q: 7 } }" class="list-item">
                Все части речи
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
  name: 'OrthoepyHomeView',
  components: { VNavbar, BButton },
};
</script>
