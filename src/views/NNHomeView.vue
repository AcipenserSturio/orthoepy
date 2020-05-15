<template>
  <div>
    <v-navbar
      title="Н/НН"
      has-home-button
    />

    <section class="section">
      <div class="columns">
        <div class="column">
          <div class="container">
            <p class="title is-5">
              Как пользоваться
            </p>
            <div class="content has-text-justified">
              <p>
                Данный тренажёр предлагает в случайном порядке проблемные слова
                из одного из нижеприведённых списков, ваша цель - правильно
                назвать у слов написание.
              </p>
              <p>
                После того, как вы один раз ответили на каждое слово в списке,
                тренажёр будет предлагать слова вновь, в этот раз приоритизируя
                те, в которых у вас были ошибки.
              </p>
              <p>
                Если вы хотите проверить написание некоторого слова, не
                дожидаясь вопроса, вы можете навести курсор на это слово в
                столбце слева, и правильное написание будет вам показано.
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
              <router-link :to="{ name: 'training', query: { q: 8 } }" class="list-item">
                Исключения
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VNavbar from '../components/VNavbar.vue';

export default {
  name: 'NNHomeView',
  components: { VNavbar },
};
</script>
